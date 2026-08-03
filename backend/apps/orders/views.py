from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.portfolio.tasks import send_registration_confirmation_email

from apps.portfolio.models import Course, Meeting, CourseRegistration, MeetingRegistration
from .models import Cart, CartItem, Order, OrderItem
from .serializers import (
    CartSerializer, AddToCartSerializer, OrderSerializer, CheckoutSerializer,
)


def _get_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = _get_cart(request.user)
        return Response(CartSerializer(cart).data)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item_type = serializer.validated_data["item_type"]
        object_id = serializer.validated_data["object_id"]

        model = Course if item_type == "course" else Meeting
        content_type = ContentType.objects.get_for_model(model)
        cart = _get_cart(request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart, content_type=content_type, object_id=object_id
        )
        if not created:
            return Response(
                {"detail": "Already in cart."}, status=status.HTTP_200_OK
            )
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)


class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        cart = _get_cart(request.user)
        deleted, _ = cart.items.filter(pk=item_id).delete()
        if not deleted:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(CartSerializer(cart).data)


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart = _get_cart(request.user)
        cart_items = list(cart.items.select_related("content_type"))
        if not cart_items:
            return Response(
                {"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            user=request.user,
            payment_method=serializer.validated_data["payment_method"],
            total_price=cart.total_price,
        )

        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                content_type=cart_item.content_type,
                object_id=cart_item.object_id,
                price=cart_item.price,
            )

            model_name = cart_item.content_type.model
            if model_name == "course":
                CourseRegistration.objects.update_or_create(
                    user=request.user, course=cart_item.item,
                    defaults={"is_paid": True},
                )
                event_title = cart_item.item.title
                event_type = "course"
            elif model_name == "meeting":
                MeetingRegistration.objects.update_or_create(
                    user=request.user, meeting=cart_item.item,
                    defaults={"is_paid": True},
                )
                event_title = cart_item.item.title
                event_type = "meeting"
            else:
                event_title = event_type = None

            if event_title and request.user.email:
                send_registration_confirmation_email.delay(
                    request.user.email, event_title, event_type
                )

        order.mark_paid()
        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class OrderHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        return Response(OrderSerializer(orders, many=True).data)