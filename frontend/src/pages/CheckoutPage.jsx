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
      <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
        <h1 className="font-heading mb-2 text-2xl font-extrabold tracking-tight text-gallery-ink">
          Checkout
        </h1>
        <p className="text-gallery-inkSoft">Your cart is empty — add something before checking out.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
      <h1 className="font-heading mb-8 text-2xl font-extrabold tracking-tight text-gallery-ink">
        Checkout
      </h1>

      <ul className="mb-6 space-y-3">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between rounded-2xl bg-white px-5 py-4 text-sm text-gallery-ink shadow-sm"
          >
            <span>{item.title}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mb-10 flex items-center justify-between font-heading font-bold text-gallery-ink">
        <span>Total</span>
        <span>${cart.total_price}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-8">
          <legend className="mb-4 text-xs uppercase tracking-[0.15em] text-gallery-inkSoft">
            Payment method (simulated — no real charge)
          </legend>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-250 ${
                  paymentMethod === method.value
                    ? "border-gallery-accent bg-gallery-accent/15 text-gallery-ink"
                    : "border-gallery-line bg-white text-gallery-inkSoft hover:border-gallery-accentDark"
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-gallery-accentDark"
                />
                {method.label}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="mb-4 text-xs tracking-[0.05em] text-gallery-accentDark">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-gallery-accent py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 hover:bg-gallery-ink hover:text-white disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Pay now"}
        </button>
      </form>
    </div>
  );
}