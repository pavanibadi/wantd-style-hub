import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { categories, products } from "../data/products.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Shop() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const cat = search.cat || "all";
  const sort = search.sort || "featured";
  const [q, setQ] = useState(search.q || "");

  useEffect(() => setQ(search.q || ""), [search.q]);

  const update = (patch) =>
    navigate({ to: "/shop", search: (prev) => ({ ...prev, ...patch }), replace: true });

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!term || p.name.toLowerCase().includes(term) || p.category.includes(term))
    );
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, cat, sort]);

  return (
    <section className="section container">
      <div className="shop-head">
        <h1>{cat === "all" ? "Shop all" : categories.find((c) => c.id === cat)?.name}</h1>
        <span className="muted">{list.length} items</span>
      </div>
      <div className="toolbar">
        <input
          className="field"
          value={q}
          onChange={(e) => { setQ(e.target.value); update({ q: e.target.value || undefined }); }}
          placeholder="Search products…"
          aria-label="Search products"
        />
        <select className="field" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? undefined : e.target.value })} aria-label="Sort">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
      <div className="chips">
        {[{ id: "all", name: "All" }, ...categories].map((c) => (
          <button key={c.id} className={`chip ${cat === c.id ? "on" : ""}`} onClick={() => update({ cat: c.id === "all" ? undefined : c.id })}>
            {c.name}
          </button>
        ))}
      </div>
      {list.length ? <ProductGrid products={list} /> : <div className="empty"><h3>Nothing matched 👀</h3><p className="muted">Try another search or category.</p></div>}
    </section>
  );
}
