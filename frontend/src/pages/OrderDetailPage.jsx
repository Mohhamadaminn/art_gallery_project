import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getOrder } from "../api/orders";

export default function OrderDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order) return; // already have it from navigation state
    getOrder(id)
      .then(setOrder)
      .catch((err) => {
        console.error(err);
        setError("Failed to load order");
      })
      .finally(() => setLoading(false));
  }, [id, order]);

  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
        <p className="py-20 text-center text-gallery-inkSoft">Loading order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
        <div className="py-20 text-center text-sm tracking-wide text-gallery-accentDark">
          {error || "Order not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
      <h1 className="font-heading mb-2 text-2xl font-extrabold tracking-tight text-gallery-ink">
        Order #{order.id}
      </h1>
      <p className="mb-8 text-xs uppercase tracking-[0.1em] text-[#4A9A6A]">
        {order.status || "Paid"}
      </p>

      <ul className="mb-8 space-y-3">
        {(order.items || []).map((item) => (
          <li
            key={item.id}
            className="flex justify-between rounded-2xl bg-white px-5 py-4 text-sm text-gallery-ink shadow-sm"
          >
            <span>{item.title || `Item #${item.object_id}`}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mb-10 flex items-center justify-between font-heading font-bold text-gallery-ink">
        <span>Total</span>
        <span>${order.total_price}</span>
      </div>

      <Link
        to="/"
        className="text-xs uppercase tracking-[0.1em] text-gallery-inkSoft transition-colors duration-250 hover:text-gallery-ink"
      >
        ← Back to Home
      </Link>
    </div>
  );
}