import { describe, it, expect } from "vitest";
import { cartTotals, validateCheckout, generateOrderId } from "./checkout.js";

const good = { name: "Asha K", email: "a@b.in", phone: "9876543210", address: "12 MG Road", city: "Pune", state: "Maharashtra", pin: "411001", payment: "cod" };

describe("checkout", () => {
  it("accepts a valid form", () => expect(validateCheckout(good)).toEqual({}));
  it("requires a 6-digit PIN", () => expect(validateCheckout({ ...good, pin: "4110" }).pin).toBeTruthy());
  it("requires a 10-digit mobile", () => expect(validateCheckout({ ...good, phone: "12345" }).phone).toBeTruthy());
  it("charges ₹99 delivery under ₹1,999", () => expect(cartTotals([{ id: "grid-journal", qty: 1 }]).delivery).toBe(99));
  it("free delivery at ₹1,999+", () => expect(cartTotals([{ id: "volt-runner-red", qty: 1 }]).delivery).toBe(0));
  it("order ids are unique", () => expect(generateOrderId()).not.toBe(generateOrderId()));
});
