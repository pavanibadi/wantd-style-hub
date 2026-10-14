import { createFileRoute } from "@tanstack/react-router";
import Wishlist from "../wantd/pages/Wishlist.jsx";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — WANTD" },
      { name: "description", content: "Everything you've saved on WANTD." },
      { property: "og:title", content: "Wishlist — WANTD" },
      { property: "og:description", content: "Your saved WANTD favourites." },
    ],
  }),
  component: Wishlist,
});
