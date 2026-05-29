-- CreateTable
CREATE TABLE "TextContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "headingEn" TEXT NOT NULL DEFAULT '',
    "headingNp" TEXT NOT NULL DEFAULT '',
    "subheadingEn" TEXT NOT NULL DEFAULT '',
    "subheadingNp" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextContent_slug_key" ON "TextContent"("slug");
