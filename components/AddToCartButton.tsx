"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "./store/CartStore";
import { useRef } from "react";

interface Props {
  product: Product;
  buttonClass: string;      // themeColors.addToCart
  //imageRef?: React.RefObject<HTMLImageElement>;
  imageRef?: React.RefObject<HTMLImageElement | null>;
 // optional for animation
  fullWidth?: boolean; // 
}

export default function AddToCartButton({ product, buttonClass, imageRef, fullWidth }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  function handleAddToCart() {
    addToCart(product);

    // If product has no imageRef (e.g. used outside ProductCard), don't animate
    if (!imageRef?.current) return;

    const img = imageRef.current;
    const cartIcon = document.getElementById("cart-icon");
    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = img.cloneNode(true) as HTMLImageElement;
    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition =
      "all 0.8s cubic-bezier(0.65, -0.1, 0.3, 1.5)";
    clone.style.zIndex = "9999";
    clone.style.borderRadius = "8px";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    // Calculate the movement
const imgX = imgRect.left + window.scrollX + imgRect.width / 2;
const imgY = imgRect.top + window.scrollY + imgRect.height / 2;
const cartX = cartRect.left + window.scrollX + cartRect.width / 2;
const cartY = cartRect.top + window.scrollY + cartRect.height / 2;

const deltaX = cartX - imgX;
const deltaY = cartY - imgY;

// Set transition before starting the transform
clone.style.transition = "transform 0.8s cubic-bezier(0.65, -0.1, 0.3, 1.5), opacity 0.8s";
clone.style.transformOrigin = "center center";

// Trigger the animation in the next frame
requestAnimationFrame(() => {
  clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
  clone.style.opacity = "0.5";
});

// Remove the clone after transition ends
clone.addEventListener("transitionend", () => clone.remove());


    

    clone.addEventListener("transitionend", () => clone.remove());
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${buttonClass} ${fullWidth ? "w-full" : "w-auto"}`}
    >
      <ShoppingCart className="w-4 h-4" />
      Add
    </button>
  );
}
