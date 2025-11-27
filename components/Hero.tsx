"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HeroData } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  const { resolvedTheme } = useTheme();

  // ---- Hooks must ALWAYS run before any return ----
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  // Detect client mount
  useEffect(() => setMounted(true), []);

  // Load hero data
  useEffect(() => {
    async function loadHero() {
      const res = await fetch("/api/hero");
      const json = (await res.json()) as HeroData;
      setData(json);
      setLoading(false);
    }
    loadHero();
  }, []);

  // Still cannot render anything until mounted, but AFTER hooks
  if (!mounted) return null;

  // Normalize theme key
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.hero[themeKey];

  // Loading UI
  if (loading) {
    return (
      <section className={`py-10 text-center ${themeColors.text}`}>
        <p className={themeColors.subtitle}>Loading hero...</p>
      </section>
    );
  }

  // No data
  if (!data) return null;

  // Final UI
  return (
    <section
      className={`font-roboto mt-4 flex flex-col md:flex-row items-center 
                  gap-4 px-8 py-4 mx-auto max-w-6xl 
                  ${themeColors.bg} ${themeColors.text}`}
    >
      {/* TEXT */}
      <div className="flex-1 space-y-4 text-left">
        <h1 className="text-4xl font-bold mb-2 md:mb-4">{data.title}</h1>

        <p className={`text-sm md:text-base mb-8 ${themeColors.subtitle}`}>
          {data.subtitle}
        </p>

        <div className="flex justify-center md:justify-start gap-4">
          <a
            href={data.readMore.href}
            className={` px-4 py-2 md:px-6 md:py-3 rounded-lg ${themeColors.buttonPrimary}`}
          >
            {data.readMore.label}
          </a>

         <button
        onClick={() => console.log("Added:", data.addToCart.productId)}
        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg ${themeColors.buttonSecondary}`}
      >
        <ShoppingCart className="w-5 h-5" />
        {data.addToCart.label}
      </button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src={data.image}
          alt="Hero Image"
          className="w-full max-w-sm rounded-xl shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
