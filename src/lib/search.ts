import { products, type Product } from "./products";

const normalize = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();

/**
 * Substring search over name, brand, category, badge and options.
 * Every typed word must match somewhere, so "wireless" finds products where it
 * appears at the start, in the middle or at the end of a word or title
 * (e.g. "Wireless Charging Stand", "Studio Wireless Headphones", "Bluetooth-wireless").
 * Results are ranked: title starts with term > word starts with term > word ends with term > contains.
 */
export function searchProducts(query: string, list: Product[] = products): Product[] {
  const q = normalize(query);
  if (!q) return list;
  const terms = q.split(" ");

  return list
    .map((product) => {
      const name = normalize(product.name);
      const haystack = normalize([product.name, product.brand, product.category, product.badge ?? "", ...product.colors].join(" "));
      const words = haystack.split(" ");
      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { product, score: 0 };
        if (name.startsWith(term)) score += 10;
        else if (words.some((w) => w.startsWith(term))) score += 6;
        else if (words.some((w) => w.endsWith(term))) score += 4;
        else score += 2;
        if (name.includes(term)) score += 3;
      }
      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);
}
