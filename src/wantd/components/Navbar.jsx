import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import { HeartIcon, BagIcon, SearchIcon, MenuIcon } from "./Icons.jsx";

export default function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  return (
    <header className="nav">
      <div className="nav-inner container">
        <button className="icon-btn nav-menu" aria-label="Menu" onClick={() => setOpen(!open)}>
          <MenuIcon />
        </button>
        <Link to="/" className="logo">WANTD<span>.</span></Link>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "active" }}>Home</Link>
          <Link to="/shop" onClick={() => setOpen(false)} activeProps={{ className: "active" }}>Shop</Link>
          <Link to="/orders" onClick={() => setOpen(false)} activeProps={{ className: "active" }}>Orders</Link>
          <form className="nav-search mobile-only" onSubmit={submit}>
            <SearchIcon />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search drops…" />
          </form>
        </nav>
        <form className="nav-search desktop-only" onSubmit={submit}>
          <SearchIcon />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search drops…" aria-label="Search" />
        </form>
        <div className="nav-actions">
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <HeartIcon />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <BagIcon />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
