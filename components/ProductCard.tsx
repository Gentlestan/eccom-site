"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "./store/Wishlist";
import { Product } from "@/lib/types";
import StarRating from "./StarRating";
import Link from "next/link";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import AddToCartButton from "./AddToCartButton";
import { useRef } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  // Needed for flying animation
  const imageRef = useRef<HTMLImageElement>(null);
  const { toggle, isLiked } = useWishlistStore();
  const liked = isLiked(product.id);

  return (
    <div
      className={`rounded-xl p-4 shadow-sm hover:shadow-md transition border 
      ${themeColors.cardBg} ${themeColors.border} 
      hover:shadow-xl hover:translate-y-2 hover:scale-[1.02]`}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="w-full h-40 md:h-48 cursor-pointer">
          <img
            ref={imageRef}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-1">
        <h3 className="font-semibold text-base md:text-lg">{product.name}</h3>
        <p className="text-sm opacity-70">{product.brand}</p>
        <StarRating rating={product.rating} />
        <p className={`text-lg font-bold ${themeColors.price}`}>
          ${product.price}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <AddToCartButton
          product={product}
          buttonClass={themeColors.addToCart}
          imageRef={imageRef}
          fullWidth = {true}
        />

        <button
  onClick={() => toggle(product.id)}
  className={`px-4 rounded-lg flex items-center justify-center ${themeColors.wishlist}`}
>
        <Heart
          className="w-4 h-4"
          color={liked ? "red" : "currentColor"}
          fill={liked ? "red" : "none"}
        />
      </button>
      </div>
    </div>
  );
}
