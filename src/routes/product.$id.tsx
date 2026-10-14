import { createFileRoute } from "@tanstack/react-router";
import ProductDetail from "../wantd/pages/ProductDetail.jsx";
import { getProduct } from "../wantd/data/products.js";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    const title = p ? `${p.name} — WANTD` : "Product — WANTD";
    const desc = p ? p.description : "Product details on WANTD.";
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
    ];
    if (p) {
      meta.push({ property: "og:image", content: p.images[0] }, { name: "twitter:image", content: p.images[0] });
    }
    return { meta };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  return <ProductDetail id={id} />;
}
