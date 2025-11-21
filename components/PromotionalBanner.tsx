{/*"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { colors, ThemeKey } from "@/theme";
import { Promo } from "@/lib/mock/promoData";

export default function PromotionalBanner() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromos() {
      const res = await fetch("/api/promo");
      const data: Promo[] = await res.json();
      setPromos(data);
      setLoading(false);
    }
    fetchPromos();
  }, []);

  return (
    <section
      className={`mt-10 px-6 md:px-10 max-w-7xl mx-auto
        ${themeColors.bg} ${themeColors.text} pb-8`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Top Deals
      </h2>

      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-48 rounded-lg ${themeColors.cardBg} animate-pulse`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {promos.map((promo) => (
            <a
              key={promo.id}
              href={promo.link || "#"}
              className={`relative overflow-hidden rounded-lg shadow 
              hover:shadow-lg transform hover:scale-[1.03] transition-all duration-300
              ${themeColors.cardBg}`}
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-48 object-cover"
              />

              
              <div
                className={`
                  absolute inset-0
                  ${themeKey === "dark" ? "bg-black/40" : "bg-black/20"}
                  flex flex-col justify-end p-4
                `}
              >
                <h3 className="text-white font-semibold text-lg">
                  {promo.title}
                </h3>
                {promo.subtitle && (
                  <p className="text-white text-sm opacity-90 mt-1">
                    {promo.subtitle}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}*/}
