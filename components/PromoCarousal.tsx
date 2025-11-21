"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import Link from "next/link";
import Image from "next/image";

export interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
}

export default function PromoCarousel() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const theme = colors.product[themeKey];

  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const [slidesPerView, setSlidesPerView] = useState<number>(4);

  // Responsive slidesPerView
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) return setSlidesPerView(1);
      if (w < 768) return setSlidesPerView(2);
      if (w < 1024) return setSlidesPerView(3);
      return setSlidesPerView(4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Fetch promo data
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/promo");
        const data = (await res.json()) as Promo[];
        setPromos(data || []);
      } catch (e) {
        console.error("Failed to load promos", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const pages = Math.max(1, Math.ceil(promos.length / slidesPerView));

  // Autoplay
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (pages <= 1 || paused) return;

    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % pages);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pages, paused]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + pages) % pages);
  }
  function next() {
    setIndex((i) => (i + 1) % pages);
  }

  useEffect(() => {
    if (index >= pages) setIndex(0);
  }, [slidesPerView, promos.length, pages]);

  if (loading) {
    return (
      <section className="mt-8 px-6 md:px-10 max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme.text}`}>Top Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-48 rounded-lg ${theme.cardBg} animate-pulse`} />
          ))}
        </div>
      </section>
    );
  }

  if (!promos.length) return null;

  const slideWidth = 100 / slidesPerView;
  const translatePercent = -index * 100;

  return (
    <section
      className={`mt-8 px-6 md:px-10 max-w-7xl mx-auto 
      ${theme.bg} ${theme.text} rounded-md pb-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Top Deals</h2>

        <div className="flex items-center gap-2">
          <button
            aria-label="Previous"
            onClick={() => { setPaused(true); prev(); }}
            className="p-2 rounded-md hover:bg-black/5 transition"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => { setPaused(true); next(); }}
            className="p-2 rounded-md hover:bg-black/5 transition"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            width: `${(promos.length * 100) / slidesPerView}%`,
            transform: `translateX(${translatePercent}%)`,
          }}
        >
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="p-2"
              style={{ flex: `0 0 ${slideWidth}%`, maxWidth: `${slideWidth}%` }}
            >
              <Link
                href={promo.link || "#"}
                className="relative overflow-hidden rounded-lg shadow hover:shadow-lg block 
                h-52 sm:h-56 md:h-60 lg:h-64"
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                  className="object-cover"
                />

                <div
                  className={`absolute inset-0 ${
                    themeKey === "dark" ? "bg-black/40" : "bg-black/25"
                  } flex flex-col justify-end p-4`}
                >
                  <h3 className="text-white font-semibold text-lg">{promo.title}</h3>
                  {promo.subtitle && (
                    <p className="text-white text-sm opacity-90 mt-1">
                      {promo.subtitle}
                    </p>
                  )}
                </div>

              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              onClick={() => setIndex(p)}
              className={`w-2 h-2 rounded-full transition ${
                p === index ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
