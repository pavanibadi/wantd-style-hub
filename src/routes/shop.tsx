import { createFileRoute } from "@tanstack/react-router";
import Shop from "../wantd/pages/Shop.jsx";

type ShopSearch = { q?: string; cat?: string; sort?: string };
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => {
    const out: ShopSearch = {};
    const q = str(s["q"]), cat = str(s["cat"]), sort = str(s["sort"]);
    if (q) out.q = q;
    if (cat) out.cat = cat;
    if (sort) out.sort = sort;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Shop All — WANTD" },
      { name: "description", content: "Search and filter fashion, sneakers, gadgets, accessories and lifestyle products." },
      { property: "og:title", content: "Shop All — WANTD" },
      { property: "og:description", content: "Browse every WANTD drop in one place." },
    ],
  }),
  component: Shop,
});
