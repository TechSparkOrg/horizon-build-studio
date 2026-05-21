import fs from "fs/promises";
import path from "path";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export interface StorageProvider {
  save(buffer: Buffer, key: string, contentType: string): Promise<string>;
  delete(key: string): Promise<void>;
}

export class LocalAdapter implements StorageProvider {
  async save(buffer: Buffer, key: string, contentType: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    // key might contain folders, so we should ensure they exist
    const fullPath = path.join(uploadDir, key);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, buffer);
    return `/uploads/${key}`;
  }

  async delete(key: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), "public", "uploads", key);
      await fs.unlink(fullPath);
    } catch (error) {
      console.warn(`Local file ${key} not found or could not be deleted.`);
    }
  }
}

export class R2Adapter implements StorageProvider {
  private client: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.bucket = process.env.R2_BUCKET || "";
    this.publicUrl = process.env.R2_PUBLIC_URL || "";
    const endpoint = process.env.R2_ENDPOINT || "";
    const accessKeyId = process.env.R2_ACCESS_KEY || "";
    const secretAccessKey = process.env.R2_SECRET_KEY || "";

    this.client = new S3Client({
      region: "auto",
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async save(buffer: Buffer, key: string, contentType: string): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
    return `${this.publicUrl}/${key}`;
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
    } catch (error) {
      console.warn(`R2 file ${key} could not be deleted:`, error);
    }
  }
}

export function getStorageProvider(): StorageProvider {
  if (process.env.STORAGE_PROVIDER === "r2") {
    return new R2Adapter();
  }
  return new LocalAdapter();
}
