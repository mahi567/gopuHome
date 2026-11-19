import { getCollection } from "astro:content";
import typesFile from "../data/types.json";

export const TYPES = typesFile.types;
export const typeOf = (id) => TYPES.find((t) => t.id === id);

/** All properties as plain objects ({ id, ...fields }), in display order. */
export async function getStays() {
  const entries = await getCollection("stays");
  return entries
    .map((e) => ({ id: e.id, ...e.data }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export const staysOfType = (stays, typeId) => stays.filter((s) => s.type === typeId);

export const mapLink = (s) =>
  s.mapUrl ||
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.mapQuery || `${s.name} ${s.location}`);

export const coverOf = (s) => (s.photos[0] ? s.photos[0].image : "");
export const badgeOf = (s) => s.label || typeOf(s.type)?.single || "";

/** { rating, count } from the property's Google listing, or {} when none is filled in. */
export const ratingOf = (s) => {
  const rating = parseFloat(s.googleRating);
  const count = parseInt(s.googleReviews, 10);
  return rating > 0 && count > 0 ? { rating, count } : {};
};
