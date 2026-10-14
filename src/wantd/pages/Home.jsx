import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { categories, products } from "../data/products.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Home() {
  const trending = products.filter((p) => p.trending).slice(0, 8);
  const fresh = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy fade-up">
            <span className="eyebrow">Drop 07 — Live now</span>
            <h1>Get what<br />you <em>WANTD.</em></h1>
            <p>Fashion, sneakers, tech and everyday flex — curated for people who scroll with taste.</p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary">Shop the drop</Link>
              <Link to="/shop" search={{ cat: "sneakers" }} className="btn btn-ghost">Sneakers →</Link>
            </div>
          </div>
          <div className="hero-media">
            <img src={hero} alt="Model in a cream hoodie and black cargos" width={1280} height={1536} />
            <div className="hero-sticker">UP TO<br /><strong>40%</strong><br />OFF</div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>FREE SHIPPING OVER ₹1,999 ✦ NEW DROPS EVERY FRIDAY ✦ EASY 14-DAY RETURNS ✦ COD AVAILABLE ✦&nbsp;</span>
          ))}
        </div>
      </div>

      <section className="section container">
        <div className="section-head"><h2>Shop by vibe</h2></div>
        <div className="cats">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ cat: c.id }} className="cat-tile">
              <img src={c.image} alt={c.name} loading="lazy" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Trending rn</h2>
          <Link to="/shop" className="link">View all →</Link>
        </div>
        <ProductGrid products={trending} />
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>New arrivals</h2>
          <Link to="/shop" className="link">View all →</Link>
        </div>
        <ProductGrid products={fresh} />
      </section>
    </>
  );
}
