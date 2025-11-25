const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in your .env");
}

// Fetch a single product
export async function fetchProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Fetch reviews for a product
export async function fetchReviews(productId: string) {
  const res = await fetch(`${BASE_URL}/reviews/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Optional: fetch all products
export async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
