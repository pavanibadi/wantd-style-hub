import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products }) {
  return (
    <div className="grid">
      {products.map((p, i) => (
        <div className="fade-up" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }} key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
