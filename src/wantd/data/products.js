const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const categories = [
  { id: "fashion", name: "Fashion", image: u("1556821840-3a63f95609a7", 700) },
  { id: "sneakers", name: "Sneakers", image: u("1600185365483-26d7a4cc7519", 700) },
  { id: "gadgets", name: "Gadgets", image: u("1505740420928-5e560c06d30e", 700) },
  { id: "accessories", name: "Accessories", image: u("1523275335684-37898b6baf30", 700) },
  { id: "lifestyle", name: "Lifestyle", image: u("1514228742587-6b1558fcca3d", 700) },
];

const raw = [
  ["Cloud Oversized Hoodie", "fashion", 2499, 3499, 4.7, ["1556821840-3a63f95609a7", "1512436991641-6745cdb1723f"], true, false],
  ["Essential Boxy Tee", "fashion", 899, 1299, 4.5, ["1521572163474-6864f9cf17ab", "1576566588028-4147f3842f27"], false, true],
  ["Midnight Biker Jacket", "fashion", 6999, 9999, 4.8, ["1551028719-00167b16eac5", "1591047139829-d91aecb6caea"], true, false],
  ["Wide Leg Denim", "fashion", 2799, 2799, 4.4, ["1541099649105-f69ad21f3246"], false, true],
  ["Utility Overshirt", "fashion", 3299, 4299, 4.6, ["1591047139829-d91aecb6caea", "1551028719-00167b16eac5"], false, true],
  ["Graphic Drop Tee", "fashion", 1099, 1499, 4.3, ["1576566588028-4147f3842f27", "1521572163474-6864f9cf17ab"], true, false],
  ["Volt Runner Red", "sneakers", 7499, 9999, 4.9, ["1542291026-7eec264c27ff", "1549298916-b41d501d3772"], true, false],
  ["Street Court Low", "sneakers", 5999, 6999, 4.6, ["1549298916-b41d501d3772", "1595950653106-6c9ebd614d3a"], false, true],
  ["Mono High Top", "sneakers", 6499, 6499, 4.5, ["1606107557195-0e29a4b5b4aa"], false, true],
  ["Aero Knit Trainer", "sneakers", 8999, 11999, 4.7, ["1600185365483-26d7a4cc7519", "1560769629-975ec94e6a86"], true, false],
  ["Retro Pop Sneaker", "sneakers", 4999, 6499, 4.4, ["1595950653106-6c9ebd614d3a", "1606107557195-0e29a4b5b4aa"], false, true],
  ["Studio Wireless Headphones", "gadgets", 8999, 12999, 4.8, ["1505740420928-5e560c06d30e", "1583394838336-acd977736f90"], true, false],
  ["Pulse Smartwatch", "gadgets", 10999, 14999, 4.6, ["1546868871-7041f2a55e12"], true, true],
  ["Pod Buds Pro", "gadgets", 4499, 5999, 4.5, ["1590658268037-6bf12165a8df"], false, true],
  ["Boom Mini Speaker", "gadgets", 2999, 3999, 4.3, ["1608043152269-423dbba4e7e1"], false, false],
  ["Retro Film Camera", "gadgets", 15999, 18999, 4.7, ["1526170375885-4d8ecf77b99f"], true, false],
  ["Pod Case Charm", "accessories", 1999, 2999, 4.6, ["1572569511254-d8f925fe2cbb"], true, false],
  ["Classic Analog Watch", "accessories", 5499, 7499, 4.7, ["1523275335684-37898b6baf30"], false, true],
  ["Everyday Backpack", "accessories", 3499, 4499, 4.5, ["1553062407-98eeb64c6a62"], true, false],
  ["Six Panel Cap", "accessories", 799, 1199, 4.2, ["1588850561407-ed78c282e89b"], false, true],
  ["Chain Link Set", "accessories", 1499, 1999, 4.4, ["1611930022073-b7a4ba5fcccd"], false, false],
  ["Noir Eau de Parfum", "lifestyle", 3999, 4999, 4.8, ["1585386959984-a4155224a1ad"], true, true],
  ["Ceramic Daily Mug", "lifestyle", 599, 799, 4.5, ["1514228742587-6b1558fcca3d"], false, true],
  ["Insulated Steel Bottle", "lifestyle", 1299, 1699, 4.6, ["1602143407151-7111542de6e8"], false, false],
  ["Grid Journal", "lifestyle", 499, 699, 4.3, ["1544816155-12df9643f363"], false, true],
  ["Desk Setup Lamp", "lifestyle", 2299, 2999, 4.4, ["1491553895911-0055eca6402d"], false, false],
];

export const products = raw.map(([name, category, price, mrp, rating, imgs, trending, isNew], i) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  category,
  price,
  mrp,
  rating,
  reviews: 40 + ((i * 37) % 400),
  images: imgs.map((id) => u(id)),
  trending,
  isNew,
  description: `The ${name} is built for everyday flex — premium materials, a clean silhouette, and the kind of detail you notice up close. Designed to go from campus to late nights without missing a beat.`,
}));

export const formatINR = (n) => "₹" + n.toLocaleString("en-IN");
export const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
export const getProduct = (id) => products.find((p) => p.id === id);
