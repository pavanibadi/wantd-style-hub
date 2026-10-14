import { Link } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import { getProduct } from "../data/products.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <section className="section container">
      <h1 className="page-title">Wishlist</h1>
      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <div className="empty">
          <h3>No saves yet</h3>
          <p className="muted">Tap the ♡ on anything you're eyeing.</p>
          <Link to="/shop" className="btn btn-primary">Browse the shop</Link>
        </div>
      )}
    </section>
  );
}
