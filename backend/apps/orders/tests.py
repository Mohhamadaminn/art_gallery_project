from decimal import Decimal

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from portfolio.models import Course, CourseRegistration
from orders.models import Cart, Order

User = get_user_model()


class CartAndCheckoutTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tester", password="pass1234")
        self.client.force_authenticate(user=self.user)
        self.course = Course.objects.create(
            title="Intro to Painting", price=Decimal("50.00"), capacity=10
        )

    def test_cart_starts_empty(self):
        response = self.client.get(reverse("cart-detail"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["items"], [])

    def test_add_course_to_cart(self):
        response = self.client.post(
            reverse("cart-add"),
            {"item_type": "course", "object_id": self.course.id},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cart.objects.get(user=self.user).items.count(), 1)

    def test_adding_same_item_twice_does_not_duplicate(self):
        for _ in range(2):
            self.client.post(
                reverse("cart-add"),
                {"item_type": "course", "object_id": self.course.id},
            )
        self.assertEqual(Cart.objects.get(user=self.user).items.count(), 1)

    def test_remove_from_cart(self):
        self.client.post(
            reverse("cart-add"),
            {"item_type": "course", "object_id": self.course.id},
        )
        item_id = Cart.objects.get(user=self.user).items.first().id
        response = self.client.delete(reverse("cart-remove", args=[item_id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Cart.objects.get(user=self.user).items.count(), 0)

    def test_checkout_empty_cart_fails(self):
        response = self.client.post(
            reverse("checkout"), {"payment_method": "mock_card"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_checkout_creates_paid_order_and_registration(self):
        self.client.post(
            reverse("cart-add"),
            {"item_type": "course", "object_id": self.course.id},
        )
        response = self.client.post(
            reverse("checkout"), {"payment_method": "mock_card"}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        order = Order.objects.get(user=self.user)
        self.assertEqual(order.status, "paid")
        self.assertEqual(order.total_price, Decimal("50.00"))
        self.assertIsNotNone(order.paid_at)

        registration = CourseRegistration.objects.get(
            user=self.user, course=self.course
        )
        self.assertTrue(registration.is_paid)

        # Cart should be cleared after checkout
        self.assertEqual(Cart.objects.get(user=self.user).items.count(), 0)

    def test_checkout_requires_valid_payment_method(self):
        self.client.post(
            reverse("cart-add"),
            {"item_type": "course", "object_id": self.course.id},
        )
        response = self.client.post(
            reverse("checkout"), {"payment_method": "totally_fake_gateway"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_order_history_lists_past_orders(self):
        self.client.post(
            reverse("cart-add"),
            {"item_type": "course", "object_id": self.course.id},
        )
        self.client.post(reverse("checkout"), {"payment_method": "mock_paypal"})
        response = self.client.get(reverse("order-history"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_anonymous_user_cannot_access_cart(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(reverse("cart-detail"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)