// Runs after "astro build". The editor only works on the editing computer,
// so it is left out of the files that get uploaded to the web host.
import fs from "node:fs";

fs.rmSync("dist/admin", { recursive: true, force: true });
const pages = fs.readdirSync("dist/stays", { withFileTypes: true }).filter((d) => d.isDirectory()).length;
console.log(`\nBuilt. Upload everything inside the "dist" folder to your web host. (${pages} property pages)`);
