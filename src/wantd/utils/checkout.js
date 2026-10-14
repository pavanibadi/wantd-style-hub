import { getProduct } from "../data/products.js";

export const FREE_SHIPPING_MIN = 1999;
export const DELIVERY_FEE = 99;

export function cartTotals(cart) {
  const items = cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((i) => i.product);
  const mrpTotal = items.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discount = mrpTotal - subtotal;
  const delivery = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : DELIVERY_FEE;
  return { items, mrpTotal, subtotal, discount, delivery, total: subtotal + delivery };
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export function validateCheckout(f) {
  const e = {};
  const v = (k) => (f[k] || "").trim();
  if (v("name").length < 2) e.name = "Enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(v("phone"))) e.phone = "Enter a valid 10-digit mobile number";
  if (v("address").length < 5) e.address = "Enter your delivery address";
  if (v("city").length < 2) e.city = "Enter your city";
  if (!v("state")) e.state = "Select your state";
  if (!/^[1-9]\d{5}$/.test(v("pin"))) e.pin = "Enter a valid 6-digit PIN code";
  if (!["cod", "upi"].includes(f.payment)) e.payment = "Choose a payment option";
  return e;
}

export function generateOrderId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WNT-${t}-${r}`;
}
