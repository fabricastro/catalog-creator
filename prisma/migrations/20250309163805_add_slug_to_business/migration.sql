/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Agregar el campo slug con un valor por defecto temporal
ALTER TABLE "Business" ADD COLUMN "slug" TEXT;

-- Generar slugs para los negocios existentes
UPDATE "Business" SET "slug" = LOWER(REPLACE("name", ' ', '-'));

-- Ahora hacemos que el campo sea obligatorio y único
ALTER TABLE "Business" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Business" ADD CONSTRAINT "Business_slug_unique" UNIQUE ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");
