// pages/products/[id].tsx
import { GetServerSideProps } from "next";
import ProductDetail from "@/components/ProductDetails";
import ProductReviews from "@/components/ProductReviews";
import { Product, Review } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { fetchProduct, fetchReviews } from "@/lib/api";

interface ProductPageProps {
  product: Product;
  reviews: Review[];
  themeKey: ThemeKey;
}

export default function ProductPage({ product, reviews, themeKey }: ProductPageProps) {
  const themeColors = colors.product[themeKey];

  return (
    <>
      <ProductDetail product={product} themeColors={themeColors} />
      <ProductReviews reviews={reviews} />
    </>
  );
}

// This runs on the server for every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  try {
    const product: Product = await fetchProduct(id);
    const reviews: Review[] = await fetchReviews(id);

    return {
      props: {
        product,
        reviews,
        themeKey: "light", // default theme for SSR; you can adjust for dark mode later
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
