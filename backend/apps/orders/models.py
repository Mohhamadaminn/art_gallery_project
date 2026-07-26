from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone


class Cart(models.Model):
    """One cart per user. Holds courses/meetings not yet checked out."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart({self.user.username})"

    @property
    def total_price(self):
        return sum((item.price for item in self.items.all()), start=0)


class CartItem(models.Model):
    """A Course or Meeting sitting in someone's cart."""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={"model__in": ("course", "meeting")},
    )
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey("content_type", "object_id")
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("cart", "content_type", "object_id")

    @property
    def price(self):
        return self.item.price

    def __str__(self):
        return f"{self.item} in {self.cart}"


class Order(models.Model):
    """A checked-out cart. Payment is simulated — no gateway involved."""

    PAYMENT_METHOD_CHOICES = [
        ("mock_card", "Mock Credit Card"),
        ("mock_paypal", "Mock PayPal"),
        ("mock_wallet", "Mock Wallet Balance"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders"
    )
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_METHOD_CHOICES, default="mock_card"
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    total_price = models.DecimalField(
        max_digits=8, decimal_places=2, validators=[MinValueValidator(0)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    def mark_paid(self):
        """Fake payment processing — always 'succeeds' instantly."""
        self.status = "paid"
        self.paid_at = timezone.now()
        self.save(update_fields=["status", "paid_at"])

    def __str__(self):
        return f"Order #{self.pk} — {self.user.username} — {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey("content_type", "object_id")
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.item} — order #{self.order_id}"