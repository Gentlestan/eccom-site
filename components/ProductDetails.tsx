"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import { ProductTheme } from "@/theme";

interface Props {
  product: Product;
  themeColors: ProductTheme;
}

export default function ProductDetail({ product }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const increaseQty = () =>
    setQuantity((q) => Math.min(q + 1, product.stock));
  const decreaseQty = () =>
    setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${themeColors.bg} ${themeColors.text}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT - IMAGES */}
        <div className="md:col-span-6">
          
          {/* Main Image */}
          <div className="border rounded-lg p-2">
            <Image
              ref={imageRef}
              src={product.images[selectedImage]}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border rounded-md p-1 ${
                    selectedImage === idx
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden relative">
                    <Image
                      src={img}
                      alt={`${product.name}-${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT - PRODUCT INFO */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-sm">Stock: {product.stock}</p>
          <p>{product.description}</p>

          {/* Quantity selector */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={increaseQty}
              className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            product={product}
            buttonClass={themeColors.addToCart}
            imageRef={imageRef}
            fullWidth={false}
          />
        </div>

      </div>
    </div>
  );
}
