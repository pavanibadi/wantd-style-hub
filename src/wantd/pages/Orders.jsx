import { Link } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function Orders() {
  const { orders, loaded } = useStore();
  if (!loaded) return <div className="section container" />;

  if (!orders.length)
    return (
      <div className="empty container section">
        <h3>No orders yet</h3>
        <p className="muted">When you place a demo order, it will show up here — even after you refresh.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );

  return (
    <section className="section container">
      <h1 className="page-title">Your orders</h1>
      <p className="muted">{orders.length} demo {orders.length === 1 ? "order" : "orders"} placed</p>
      <div className="orders-list">
        {orders.map((o) => {
          const count = o.items.reduce((s, i) => s + i.qty, 0);
          return (
            <article className="order-card panel" key={o.id}>
              <div className="order-card-head">
                <div>
                  <span className="order-card-id">{o.id}</span>
                  <span className="muted order-card-date">
                    Placed {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <span className="order-status">{o.status || "Confirmed"}</span>
              </div>
              <div className="order-card-items">
                {o.items.map((i) => (
                  <div className="order-item" key={i.id}>
                    <img src={i.image} alt={i.name} loading="lazy" />
                    <div>
                      <p className="order-item-name">{i.name}</p>
                      <p className="muted">Qty {i.qty} · {inr(i.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-card-foot">
                <div className="order-card-meta">
                  <span><strong>{inr(o.totals.total)}</strong></span>
                  <span className="muted">{count} {count === 1 ? "item" : "items"}</span>
                  <span className="muted">{o.payment === "cod" ? "Cash on Delivery" : "Demo UPI"}</span>
                </div>
                <Link to="/order/$orderId" params={{ orderId: o.id }} className="btn btn-ghost">View details</Link>
              </div>
            </article>
          );
        })}
      </div>
      <Link to="/shop" className="btn btn-primary orders-continue">Continue shopping</Link>
    </section>
  );
}
