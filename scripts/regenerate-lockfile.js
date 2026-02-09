import { execSync } from "child_process";
import { unlinkSync, existsSync } from "fs";
import { join } from "path";

const root = process.cwd();
const lockfile = join(root, "pnpm-lock.yaml");

// Delete existing lockfile
if (existsSync(lockfile)) {
  unlinkSync(lockfile);
  console.log("Deleted existing pnpm-lock.yaml");
} else {
  console.log("No existing pnpm-lock.yaml found");
}

// Run pnpm install to regenerate
try {
  execSync("pnpm install --no-frozen-lockfile", {
    cwd: root,
    stdio: "inherit",
  });
  console.log("Successfully regenerated pnpm-lock.yaml");
} catch (e) {
  console.error("pnpm install failed:", e.message);
}
