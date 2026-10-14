import { Link } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext.jsx";
import { formatINR, discount } from "../data/products.js";
import { HeartIcon } from "./Icons.jsx";
import Rating from "./Rating.jsx";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWished, addToCart } = useStore();
  const off = discount(product);
  const wished = isWished(product.id);

  return (
    <article className="card">
      <Link to="/product/$id" params={{ id: product.id }} className="card-media">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.images[1] && <img className="card-alt" src={product.images[1]} alt="" loading="lazy" />}
        {off > 0 && <span className="tag tag-off">-{off}%</span>}
        {product.isNew && <span className="tag tag-new">NEW</span>}
      </Link>
      <button
        className={`wish-btn ${wished ? "on" : ""}`}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
      >
        <HeartIcon filled={wished} />
      </button>
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <Link to="/product/$id" params={{ id: product.id }} className="card-name">{product.name}</Link>
        <Rating value={product.rating} count={product.reviews} />
        <div className="card-foot">
          <div className="price">
            <strong>{formatINR(product.price)}</strong>
            {off > 0 && <s>{formatINR(product.mrp)}</s>}
          </div>
          <button className="quick-add" onClick={() => addToCart(product.id)} aria-label="Add to cart">+</button>
        </div>
      </div>
    </article>
  );
}
