from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Cart, CartItem, Order, OrderItem
from apps.portfolio.models import Course, Meeting 


class CartItemSerializer(serializers.ModelSerializer):
    item_type = serializers.CharField(source="content_type.model", read_only=True)
    title = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=8, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "item_type", "object_id", "title", "price", "added_at"]

    def get_title(self, obj):
        return getattr(obj.item, "title", str(obj.item))


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(
        max_digits=8, decimal_places=2, read_only=True
    )

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price", "updated_at"]


class AddToCartSerializer(serializers.Serializer):
    item_type = serializers.ChoiceField(choices=["course", "meeting"])
    object_id = serializers.IntegerField()

    def validate(self, attrs):
        model = Course if attrs["item_type"] == "course" else Meeting
        if not model.objects.filter(pk=attrs["object_id"]).exists():
            raise serializers.ValidationError("Item not found.")
        return attrs


class OrderItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id", "title", "price"]

    def get_title(self, obj):
        return getattr(obj.item, "title", str(obj.item))


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "payment_method", "status", "total_price",
            "created_at", "paid_at", "items",
        ]
        read_only_fields = ["status", "total_price", "created_at", "paid_at"]


class CheckoutSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=Order.PAYMENT_METHOD_CHOICES)