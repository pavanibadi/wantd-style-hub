import { formatINR } from "../data/products.js";

export default function OrderSummary({ items, totals, children }) {
  return (
    <aside className="summary">
      <h3>Order summary</h3>
      <ul className="summary-items">
        {items.map((i) => (
          <li key={i.id}>
            <img src={i.image} alt="" />
            <span className="summary-name">{i.name}<small>Qty {i.qty}</small></span>
            <span>{formatINR(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <div><span>MRP total</span><span>{formatINR(totals.mrpTotal)}</span></div>
      <div><span>Discount</span><span className="accent-text">−{formatINR(totals.discount)}</span></div>
      <div><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
      <div><span>Delivery</span><span>{totals.delivery ? formatINR(totals.delivery) : "Free"}</span></div>
      <div className="total"><span>Total</span><span>{formatINR(totals.total)}</span></div>
      {children}
    </aside>
  );
}
