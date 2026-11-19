import { defineConfig } from "astro/config";

// Static site: `npm run build` writes plain HTML, CSS and JS into dist/.
export default defineConfig({
  // Set this to the real address once the domain is connected (used for link previews).
  // site: "https://www.gopuhomestays.com",
  server: { port: 4321 },
});
