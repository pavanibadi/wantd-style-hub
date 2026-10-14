import { createFileRoute } from "@tanstack/react-router";
import Checkout from "../wantd/pages/Checkout.jsx";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — WANTD" },
      { name: "description", content: "Enter your delivery details and place your WANTD order." },
      { property: "og:title", content: "Checkout — WANTD" },
      { property: "og:description", content: "Complete your WANTD order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});
