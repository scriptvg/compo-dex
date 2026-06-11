// utils/pokemon.utils.ts
import type { NamedAPIResource } from "pokenode-ts";

/**
 * Elimina duplicados por nombre
 */
export function uniqueByName<T extends NamedAPIResource>(list: T[]): T[] {
  const seen = new Set<string>();
  return list.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}