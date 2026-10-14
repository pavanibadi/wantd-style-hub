import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import { cartTotals, validateCheckout, generateOrderId, INDIAN_STATES } from "../utils/checkout.js";
import OrderSummary from "../components/OrderSummary.jsx";

const empty = { name: "", email: "", phone: "", address: "", city: "", state: "", pin: "", payment: "cod" };

function Field({ label, name, form, errors, onChange, ...rest }) {
  return (
    <label className={`form-field ${errors[name] ? "has-error" : ""}`}>
      <span>{label}</span>
      <input className="field" name={name} value={form[name]} onChange={onChange} aria-invalid={!!errors[name]} {...rest} />
      {errors[name] && <small className="error">{errors[name]}</small>}
    </label>
  );
}

export default function Checkout() {
  const { cart, loaded, placeOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const totals = cartTotals(cart);

  if (!loaded) return <div className="section container" />;
  if (!totals.items.length)
    return (
      <div className="empty container section">
        <h3>Your bag is empty</h3>
        <p className="muted">Add something before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateCheckout(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setPlacing(true);
    const id = generateOrderId();
    const order = {
      id,
      createdAt: new Date().toISOString(),
      customer: Object.fromEntries(Object.entries(form).map(([k, v]) => [k, String(v).trim()])),
      payment: form.payment,
      items: totals.items.map((i) => ({ id: i.id, name: i.product.name, price: i.product.price, mrp: i.product.mrp, qty: i.qty, image: i.product.images[0] })),
      totals: { mrpTotal: totals.mrpTotal, subtotal: totals.subtotal, discount: totals.discount, delivery: totals.delivery, total: totals.total },
    };
    setTimeout(() => {
      placeOrder(order);
      navigate({ to: "/order/$orderId", params: { orderId: id } });
    }, 700);
  };

  const p = { form, errors, onChange };
  const summaryItems = totals.items.map((i) => ({ id: i.id, name: i.product.name, price: i.product.price, qty: i.qty, image: i.product.images[0] }));

  return (
    <section className="section container">
      <h1 className="page-title">Checkout</h1>
      <form className="cart checkout" onSubmit={submit} noValidate>
        <div className="checkout-form">
          <fieldset className="panel">
            <legend>Contact details</legend>
            <Field label="Full name" name="name" autoComplete="name" maxLength={80} {...p} />
            <div className="form-row">
              <Field label="Email" name="email" type="email" autoComplete="email" maxLength={120} {...p} />
              <Field label="Mobile number" name="phone" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="10-digit number" {...p} />
            </div>
          </fieldset>

          <fieldset className="panel">
            <legend>Delivery address</legend>
            <Field label="Address" name="address" autoComplete="street-address" maxLength={200} placeholder="House no., street, area" {...p} />
            <div className="form-row three">
              <Field label="City" name="city" autoComplete="address-level2" maxLength={60} {...p} />
              <label className={`form-field ${errors.state ? "has-error" : ""}`}>
                <span>State</span>
                <select className="field" name="state" value={form.state} onChange={onChange} aria-invalid={!!errors.state}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.state && <small className="error">{errors.state}</small>}
              </label>
              <Field label="PIN code" name="pin" inputMode="numeric" autoComplete="postal-code" maxLength={6} {...p} />
            </div>
          </fieldset>

          <fieldset className="panel">
            <legend>Payment</legend>
            <div className="pay-options">
              {[
                { id: "cod", title: "Cash on Delivery", note: "Pay when your order arrives." },
                { id: "upi", title: "Demo UPI", note: "Simulated payment — no money is charged." },
              ].map((o) => (
                <label key={o.id} className={`pay-option ${form.payment === o.id ? "on" : ""}`}>
                  <input type="radio" name="payment" value={o.id} checked={form.payment === o.id} onChange={onChange} />
                  <span><strong>{o.title}</strong><small>{o.note}</small></span>
                </label>
              ))}
            </div>
            {errors.payment && <small className="error">{errors.payment}</small>}
            <p className="muted demo-note">This is a demo store. No real payment details are collected.</p>
          </fieldset>
        </div>

        <OrderSummary items={summaryItems} totals={totals}>
          <button type="submit" className="btn btn-primary full" disabled={placing}>
            {placing ? "Placing order…" : "Place demo order"}
          </button>
          <Link to="/cart" className="summary-back">← Back to bag</Link>
        </OrderSummary>
      </form>
    </section>
  );
}
