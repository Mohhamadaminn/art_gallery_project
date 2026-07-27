import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { checkout } from "../api/orders";

// Keep this in sync with Order.PAYMENT_METHOD_CHOICES on the backend.
const PAYMENT_METHODS = [
  { value: "mock_card", label: "Mock Credit Card" },
  { value: "mock_paypal", label: "Mock PayPal" },
  { value: "mock_wallet", label: "Mock Wallet Balance" },
];

export default function CheckoutPage() {
  const { cart, clearCartLocally } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const order = await checkout(paymentMethod);
      clearCartLocally();
      navigate(`/orders/${order.id}`, { state: { order } });
    } catch (err) {
      setError(err.response?.data?.detail || "Checkout failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty — add something before checking out.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <ul className="checkout-page__summary">
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.title} — ${item.price}
          </li>
        ))}
      </ul>
      <div className="checkout-page__total">Total: ${cart.total_price}</div>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Payment method (simulated — no real charge)</legend>
          {PAYMENT_METHODS.map((method) => (
            <label key={method.value} className="checkout-page__method">
              <input
                type="radio"
                name="payment_method"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method.label}
            </label>
          ))}
        </fieldset>

        {error && <p className="checkout-page__error">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Processing..." : "Pay now"}
        </button>
      </form>
    </div>
  );
}