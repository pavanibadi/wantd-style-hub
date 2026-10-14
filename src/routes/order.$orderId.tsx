import { createFileRoute } from "@tanstack/react-router";
import OrderConfirmation from "../wantd/pages/OrderConfirmation.jsx";

export const Route = createFileRoute("/order/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — WANTD" },
      { name: "description", content: "Your WANTD order confirmation." },
      { property: "og:title", content: "Order Confirmed — WANTD" },
      { property: "og:description", content: "Your WANTD order confirmation." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  return <OrderConfirmation orderId={orderId} />;
}
