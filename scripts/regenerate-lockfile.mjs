import { execSync } from "child_process";
import { unlinkSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const lockfile = resolve(root, "pnpm-lock.yaml");

// Delete existing lockfile
if (existsSync(lockfile)) {
  unlinkSync(lockfile);
  console.log("Deleted existing pnpm-lock.yaml");
} else {
  console.log("No existing pnpm-lock.yaml found");
}

// Regenerate lockfile
console.log("Running pnpm install to generate fresh lockfile...");
try {
  execSync("pnpm install --no-frozen-lockfile", {
    cwd: root,
    stdio: "inherit",
  });
  console.log("Successfully regenerated pnpm-lock.yaml");
} catch (e) {
  console.error("pnpm install failed:", e.message);
  process.exit(1);
}
