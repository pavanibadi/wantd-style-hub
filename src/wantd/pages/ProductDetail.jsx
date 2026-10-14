import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { getProduct, products, formatINR, discount } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import Rating from "../components/Rating.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { HeartIcon } from "../components/Icons.jsx";

export default function ProductDetail({ id }) {
  const product = getProduct(id);
  const { addToCart, toggleWishlist, isWished } = useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product)
    return (
      <div className="empty container section">
        <h3>Product not found</h3>
        <Link to="/shop" className="btn btn-primary">Back to shop</Link>
      </div>
    );

  const off = discount(product);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const add = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <section className="section container pdp" key={product.id}>
        <div className="gallery">
          <div className="gallery-main">
            <img key={active} className="fade-in" src={product.images[active]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={src} className={`thumb ${i === active ? "on" : ""}`} onClick={() => setActive(i)} aria-label={`Image ${i + 1}`}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pdp-info fade-up">
          <Link to="/shop" search={{ cat: product.category }} className="card-cat">{product.category}</Link>
          <h1>{product.name}</h1>
          <Rating value={product.rating} count={product.reviews} />
          <div className="pdp-price">
            <strong>{formatINR(product.price)}</strong>
            {off > 0 && <><s>{formatINR(product.mrp)}</s><span className="tag-inline">{off}% OFF</span></>}
          </div>
          <p className="muted">Inclusive of all taxes</p>
          <p className="pdp-desc">{product.description}</p>
          <div className="pdp-actions">
            <QuantitySelector value={qty} onChange={setQty} />
            <button className="btn btn-primary grow" onClick={add}>{added ? "Added ✓" : "Add to Cart"}</button>
            <button className={`icon-btn big ${isWished(product.id) ? "wished" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist">
              <HeartIcon filled={isWished(product.id)} />
            </button>
          </div>
          <ul className="perks">
            <li>🚚 Free delivery over ₹1,999</li>
            <li>↩️ 14-day easy returns</li>
            <li>💸 Cash on delivery available</li>
          </ul>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section container">
          <div className="section-head"><h2>You might also want</h2></div>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
