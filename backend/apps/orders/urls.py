from django.urls import path
from .views import (
    CartView, AddToCartView, RemoveFromCartView, CheckoutView, OrderHistoryView,
)

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart-detail"),
    path("cart/add/", AddToCartView.as_view(), name="cart-add"),
    path("cart/remove/<int:item_id>/", RemoveFromCartView.as_view(), name="cart-remove"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("orders/", OrderHistoryView.as_view(), name="order-history"),
]