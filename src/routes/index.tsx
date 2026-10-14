import { createFileRoute } from "@tanstack/react-router";
import Home from "../wantd/pages/Home.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WANTD — Gen Z Fashion, Sneakers & Tech" },
      { name: "description", content: "Shop curated fashion, sneakers, gadgets and lifestyle drops at WANTD." },
      { property: "og:title", content: "WANTD — Gen Z Fashion, Sneakers & Tech" },
      { property: "og:description", content: "Curated drops for people who scroll with taste." },
    ],
  }),
  component: Home,
});
