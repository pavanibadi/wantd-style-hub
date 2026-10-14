import { createFileRoute } from "@tanstack/react-router";
import Cart from "../wantd/pages/Cart.jsx";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — WANTD" },
      { name: "description", content: "Review the items in your WANTD shopping bag." },
      { property: "og:title", content: "Your Bag — WANTD" },
      { property: "og:description", content: "Review the items in your WANTD bag." },
    ],
  }),
  component: Cart,
});
