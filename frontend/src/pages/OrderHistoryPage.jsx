import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderHistory } from "../api/orders";

const STATUS_STYLES = {
  paid: "bg-gallery-accent text-gallery-ink",
  pending: "bg-gallery-line text-gallery-inkSoft",
  cancelled: "bg-gallery-ink/10 text-gallery-inkSoft",
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrderHistory()
      .then(setOrders)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <p className="py-20 text-center text-gallery-inkSoft">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <p className="py-20 text-center text-gallery-accentDark">Could not load order history.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <p className="py-20 text-center text-gallery-inkSoft">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
      <h1 className="font-heading mb-8 text-2xl font-extrabold tracking-tight text-gallery-ink">
        Your orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-250 hover:shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <strong className="font-heading text-gallery-ink">Order #{order.id}</strong>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  STATUS_STYLES[order.status] ?? "bg-gallery-line text-gallery-inkSoft"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gallery-inkSoft">
              <div>Paid via: {order.payment_method}</div>
              <div>Total: ${order.total_price}</div>
              <div>Date: {new Date(order.created_at).toLocaleDateString()}</div>
            </div>

            <ul className="mt-4 space-y-1 border-t border-gallery-line pt-4 text-sm text-gallery-ink">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}