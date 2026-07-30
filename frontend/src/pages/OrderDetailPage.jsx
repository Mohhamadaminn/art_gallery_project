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

  if (loading) return <p className="text-center py-20">Loading order...</p>;

  if (error || !order) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error || "Order not found"}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1
        className="text-2xl mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Order #{order.id}
      </h1>
      <p className="text-xs uppercase tracking-[0.1em] text-[#4A9A6A] mb-8">
        {order.status || "Paid"}
      </p>

      <ul className="space-y-3 mb-8">
        {(order.items || []).map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-3">
            <span>{item.title || `Item #${item.object_id}`}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center font-bold mb-10">
        <span>Total</span>
        <span>${order.total_price}</span>
      </div>

      <Link
        to="/"
        className="text-xs uppercase tracking-[0.1em] text-[#8C8C8C] hover:text-[#1A1A1A]"
      >
        ← Back to Home
      </Link>
    </div>
  );
}