"use client";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { searchProducts } from "@/lib/search";

/**
 * Instant results from the products already loaded in the browser,
 * merged with (debounced) results from /api/search, which is where your database lives.
 */
export function useProductSearch(query: string, options: { limit?: number } = {}) {
  const { limit } = options;
  const local = useMemo(() => searchProducts(query), [query]);
  const [remote, setRemote] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setRemote([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        if (!res.ok) throw new Error("search failed");
        const data = (await res.json()) as { products?: Product[] };
        setRemote(data.products ?? []);
      } catch {
        if (!controller.signal.aborted) setRemote([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const results = useMemo(() => {
    if (!query.trim()) return local;
    const seen = new Set(local.map((p) => p.id));
    return [...local, ...remote.filter((p) => !seen.has(p.id))];
  }, [local, remote, query]);

  return { results: limit ? results.slice(0, limit) : results, loading };
}
