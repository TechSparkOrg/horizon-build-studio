function findCliBinary(): string {
  const candidates = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), "node_modules", "@gltf-transform", "cli", "bin", "cli.js"),
    path.join(/*turbopackIgnore: true*/ process.cwd(), "node_modules", ".pnpm", "node_modules", "@gltf-transform", "cli", "bin", "cli.js"),
  ];
  const pkg = path.join(/*turbopackIgnore: true*/ process.cwd(), "node_modules", "@gltf-transform", "cli", "package.json");
  try {
    if (fs.existsSync(pkg)) {
      const bin = JSON.parse(fs.readFileSync(pkg, "utf-8")).bin;
      const binPath = typeof bin === "string" ? bin : bin?.["gltf-transform"];
      if (binPath) candidates.unshift(path.join(/*turbopackIgnore: true*/ path.dirname(pkg), binPath));
    }
  } catch { /* ignore */ }
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return "npx @gltf-transform/cli";
}

let fs: typeof import("fs");
let path: typeof import("path");
let os: typeof import("os");
let execSync: typeof import("child_process")["execSync"];

async function ensureDeps() {
  if (!fs) {
    const [fsMod, pathMod, osMod, cpMod] = await Promise.all([
      import("fs") as Promise<typeof import("fs")>,
      import("path") as Promise<typeof import("path")>,
      import("os") as Promise<typeof import("os")>,
      import("child_process") as Promise<typeof import("child_process")>,
    ]);
    fs = fsMod;
    path = pathMod;
    os = osMod;
    execSync = cpMod.execSync;
  }
}

export async function compressGlb(buffer: Buffer): Promise<Buffer> {
  await ensureDeps();
  const tmpDir = fs!.mkdtempSync(path!.join(os!.tmpdir(), "glb-compress-"));
  const inputPath = path!.join(tmpDir, "input.glb");
  const outputPath = path!.join(tmpDir, "output.glb");

  try {
    const cli = findCliBinary();
    fs!.writeFileSync(inputPath, buffer);
    execSync!(/*turbopackIgnore: true*/ `"${cli}" optimize "${inputPath}" "${outputPath}" --compress draco`, {
      stdio: "pipe",
      timeout: 60_000,
    });
    return fs!.readFileSync(outputPath);
  } catch {
    return buffer;
  } finally {
    fs!.rmSync(tmpDir, { recursive: true, force: true });
  }
}
