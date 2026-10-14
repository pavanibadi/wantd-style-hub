import { createFileRoute } from "@tanstack/react-router";
import Orders from "../wantd/pages/Orders.jsx";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — WANTD" },
      { name: "description", content: "Every demo order you've placed on WANTD." },
      { property: "og:title", content: "Your Orders — WANTD" },
      { property: "og:description", content: "Every demo order you've placed on WANTD." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Orders,
});
