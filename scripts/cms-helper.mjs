// Starts the editor helper (decap-server) so it reads and saves files in THIS
// project folder, whichever folder the command was started from.
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const child = spawn("npx decap-server", {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, GIT_REPO_DIRECTORY: root, MODE: "fs", PORT: "8081" },
});
const stop = () => { child.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
child.on("exit", (code) => process.exit(code ?? 0));
