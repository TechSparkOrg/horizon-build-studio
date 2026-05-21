import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

function findCliBinary(): string {
  const candidates = [
    path.join(process.cwd(), "node_modules", "@gltf-transform", "cli", "bin", "cli.js"),
    path.join(process.cwd(), "node_modules", ".pnpm", "node_modules", "@gltf-transform", "cli", "bin", "cli.js"),
  ];
  const pkg = path.join(process.cwd(), "node_modules", "@gltf-transform", "cli", "package.json");
  try {
    if (fs.existsSync(pkg)) {
      const bin = JSON.parse(fs.readFileSync(pkg, "utf-8")).bin;
      const binPath = typeof bin === "string" ? bin : bin?.["gltf-transform"];
      if (binPath) candidates.unshift(path.join(path.dirname(pkg), binPath));
    }
  } catch { /* ignore */ }
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return "npx @gltf-transform/cli";
}

export async function compressGlb(buffer: Buffer): Promise<Buffer> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "glb-compress-"));
  const inputPath = path.join(tmpDir, "input.glb");
  const outputPath = path.join(tmpDir, "output.glb");

  try {
    const cli = findCliBinary();
    fs.writeFileSync(inputPath, buffer);
    execSync(`"${cli}" optimize "${inputPath}" "${outputPath}" --compress draco`, {
      stdio: "pipe",
      timeout: 60_000,
    });
    return fs.readFileSync(outputPath);
  } catch {
    return buffer;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}
