import { Link } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import { formatINR } from "../data/products.js";
import { cartTotals } from "../utils/checkout.js";
import QuantitySelector from "../components/QuantitySelector.jsx";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useStore();
  const { items, subtotal, discount: savings, delivery: shipping } = cartTotals(cart);

  if (!items.length)
    return (
      <div className="empty container section">
        <h3>Your bag is empty</h3>
        <p className="muted">Go find something you WANT.</p>
        <Link to="/shop" className="btn btn-primary">Start shopping</Link>
      </div>
    );

  return (
    <section className="section container">
      <h1 className="page-title">Your bag</h1>
      <div className="cart">
        <div className="cart-items">
          {items.map(({ id, qty, product }) => (
            <div className="cart-row" key={id}>
              <Link to="/product/$id" params={{ id }}><img src={product.images[0]} alt={product.name} /></Link>
              <div className="cart-meta">
                <span className="card-cat">{product.category}</span>
                <Link to="/product/$id" params={{ id }} className="card-name">{product.name}</Link>
                <strong>{formatINR(product.price)}</strong>
                <div className="cart-controls">
                  <QuantitySelector value={qty} onChange={(v) => updateQty(id, v)} />
                  <button className="link" onClick={() => removeFromCart(id)}>Remove</button>
                </div>
              </div>
              <strong className="cart-line">{formatINR(product.price * qty)}</strong>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Summary</h3>
          <div><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          <div><span>You save</span><span className="accent-text">−{formatINR(savings)}</span></div>
          <div><span>Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
          <div className="total"><span>Total</span><span>{formatINR(subtotal + shipping)}</span></div>
          <Link to="/checkout" className="btn btn-primary full">Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
