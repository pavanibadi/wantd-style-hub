import { Link } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import OrderSummary from "../components/OrderSummary.jsx";

export default function OrderConfirmation({ orderId }) {
  const { getOrder, loaded } = useStore();
  if (!loaded) return <div className="section container" />;
  const order = getOrder(orderId);

  if (!order)
    return (
      <div className="empty container section">
        <h3>Order not found</h3>
        <p className="muted">We couldn't find an order with ID {orderId}.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );

  const c = order.customer;
  return (
    <section className="section container">
      <div className="confirm-hero fade-up">
        <span className="confirm-check" aria-hidden="true">✓</span>
        <h1 className="page-title">Order placed!</h1>
        <p className="muted">Thanks, {c.name.split(" ")[0]}. A demo confirmation for your order is below.</p>
        <div className="order-id">Order ID <strong>{order.id}</strong></div>
      </div>
      <div className="cart">
        <div className="checkout-form">
          <div className="panel">
            <h3 className="panel-title">Delivering to</h3>
            <p>{c.name}<br />{c.address}<br />{c.city}, {c.state} — {c.pin}<br />{c.phone} · {c.email}</p>
          </div>
          <div className="panel">
            <h3 className="panel-title">Payment</h3>
            <p>{order.payment === "cod" ? "Cash on Delivery" : "Demo UPI (simulated, not charged)"}</p>
            <p className="muted">Placed {new Date(order.createdAt).toLocaleString("en-IN")}</p>
          </div>
          <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
        </div>
        <OrderSummary items={order.items} totals={order.totals} />
      </div>
    </section>
  );
}
