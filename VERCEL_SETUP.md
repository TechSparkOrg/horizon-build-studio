# Vercel & Production Setup Guide

## 1. Vercel Postgres Setup
1. Go to your Vercel project dashboard.
2. Under **Storage**, create a new **Postgres** database.
3. Once created, Vercel will automatically add the Postgres environment variables to your project. Ensure the `DATABASE_URL` environment variable is available.
4. Run `npx prisma db push` or `npx prisma migrate deploy` in your deployment pipeline to keep the schema up to date.

## 2. Cloudflare R2 Setup (Storage)
1. Go to the Cloudflare dashboard and create an **R2 Bucket**.
2. Go to **Manage R2 API Tokens** and create a token with **Edit** access to the bucket.
3. Note the **Access Key ID**, **Secret Access Key**, and the **Endpoint** URL.
4. Enable public access for your bucket or set up a custom domain to get the **Public URL**.
5. Add the following environment variables to your Vercel project:
   - `STORAGE_PROVIDER=r2`
   - `R2_BUCKET=<your-bucket-name>`
   - `R2_ENDPOINT=<your-r2-endpoint>`
   - `R2_ACCESS_KEY=<your-access-key-id>`
   - `R2_SECRET_KEY=<your-secret-access-key>`
   - `R2_PUBLIC_URL=<your-public-url>`

## 3. Prisma on Alpine Linux (Docker Setup)
If running inside a custom Docker environment (like `node:22-alpine`), ensure `openssl` is installed, as it is required by the Prisma engine. Our included `Dockerfile` already handles this.
