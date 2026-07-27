import { useEffect, useState } from "react";
import { getOrderHistory } from "../api/orders";

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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Could not load order history.</p>;
  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="order-history-page">
      <h1>Your orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-history-page__order">
          <div className="order-history-page__header">
            <strong>Order #{order.id}</strong>
            <span className={`order-status order-status--${order.status}`}>
              {order.status}
            </span>
          </div>
          <div>Paid via: {order.payment_method}</div>
          <div>Total: ${order.total_price}</div>
          <div>Date: {new Date(order.created_at).toLocaleDateString()}</div>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.title} — ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}