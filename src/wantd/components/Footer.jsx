import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="logo logo-light">WANTD<span>.</span></div>
          <p>Stuff you actually want. Curated drops, every week.</p>
        </div>
        <div className="footer-links">
          <Link to="/shop">Shop all</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} WANTD. Made for the timeline.</div>
    </footer>
  );
}
