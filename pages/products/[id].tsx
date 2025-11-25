"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetails";
import ProductReviews from "@/components/ProductReviews";
import { Product, Review } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { useTheme } from "next-themes";
import { fetchProduct, fetchReviews } from "@/lib/api";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const productData: Product = await fetchProduct(id as string);
        setProduct(productData);

        const reviewsData: Review[] = await fetchReviews(id as string);
        setReviews(reviewsData);

        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push("/products");
      }
    };

    loadData();
  }, [id, router]);

  if (loading || !product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <ProductDetail product={product} themeColors={themeColors} />
      <ProductReviews reviews={reviews} />
    </>
  );
}
