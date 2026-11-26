import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One JSON file per property in src/content/stays/. The file name is the
// property's id: it becomes the page address (/stays/<id>/).
// The admin panel (Decap CMS) writes these files.
const stays = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/stays" }),
  schema: z.object({
    name: z.string(),
    code: z.string().optional().default(""),
    type: z.enum(["flats", "hostels", "lodges"]),
    label: z.string().optional().default(""),
    order: z.number().optional().default(1000),
    location: z.string(),
    mapUrl: z.string().optional().default(""),
    mapQuery: z.string().optional().default(""),
    price: z.string().optional().default(""),
    // From the property's Google listing; left empty when it has no reviews.
    googleRating: z.union([z.number(), z.string()]).nullish(),
    googleReviews: z.union([z.number(), z.string()]).nullish(),
    rooms: z.string().optional().default(""),
    capacity: z.string().optional().default(""),
    description: z.string().optional().default(""),
    amenities: z.array(z.string()).optional().default([]),
    photos: z
      .array(z.object({ image: z.string(), caption: z.string().optional().default("") }))
      .optional()
      .default([]),
  }),
});

export const collections = { stays };
