import sharp from "sharp";
import { getStorageProvider } from "./storage";

const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

const MODEL_TYPES = new Set(["model/gltf-binary", "model/gltf+json", "model/gltf"]);
const MODEL_EXTS = new Set([".glb", ".gltf"]);
const IMAGE_MIME_PREFIX = "image/";

export async function uploadFile(file: File, subdir = "projects", compress = true): Promise<{ url: string; thumbUrl?: string }> {
  const ext = getExtension(file.name);
  const isModel = MODEL_EXTS.has(ext) || MODEL_TYPES.has(file.type);

  if (!file.type.startsWith(IMAGE_MIME_PREFIX) && !isModel) {
    throw new Error("Unsupported file type. Only images (.jpg, .png, .webp) and 3D models (.glb, .gltf) are allowed.");
  }

  if (file.type.startsWith(IMAGE_MIME_PREFIX) && file.size > IMAGE_MAX_SIZE) {
    throw new Error("Image exceeds 10MB limit.");
  }

  const bytes = await file.arrayBuffer();
  let buffer = Buffer.from(bytes);
  const storage = getStorageProvider();
  const baseFilename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (isModel) {
    if (compress && file.name.endsWith(".glb")) {
      try {
        const { compressGlb } = await import("./compress-glb");
        buffer = Buffer.from(await compressGlb(buffer));
      } catch {
        // Draco compression unavailable, use original
      }
    }
    const key = `${subdir}/${baseFilename}${ext}`;
    const contentType = file.type || "model/gltf-binary";
    const url = await storage.save(buffer, key, contentType);
    return { url };
  }

  const mainImage = await sharp(buffer)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const thumbImage = await sharp(buffer)
    .resize(400, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const mainKey = `${subdir}/${baseFilename}.webp`;
  const thumbKey = `${subdir}/${baseFilename}_thumb.webp`;

  const url = await storage.save(mainImage, mainKey, "image/webp");
  const thumbUrl = await storage.save(thumbImage, thumbKey, "image/webp");

  return { url, thumbUrl };
}

function getExtension(filename: string): string {
  const i = filename.lastIndexOf(".");
  return i === -1 ? "" : filename.slice(i).toLowerCase();
}
