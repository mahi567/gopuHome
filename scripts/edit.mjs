// "Edit site": starts the site preview and the editor helper together,
// then opens the editing screen in the browser. Close this window to stop.
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const run = (cmd) => spawn(cmd, { cwd: root, stdio: "inherit", shell: true });
const helper = run("node scripts/cms-helper.mjs");
const site = run("npx astro dev --port 4321");

const url = "http://localhost:4321/admin/";
setTimeout(() => {
  console.log("\n==============================================================");
  console.log("  Editor:        " + url + "   (press Login, no password)");
  console.log("  Site preview:  http://localhost:4321/");
  console.log("  Changes are saved into this folder as you press Publish.");
  console.log("  When finished: close this window, then run \"Build site\".");
  console.log("==============================================================\n");
  const opener = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
  spawn(opener, { shell: true, stdio: "ignore" });
}, 6000);

const stop = () => { helper.kill(); site.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
