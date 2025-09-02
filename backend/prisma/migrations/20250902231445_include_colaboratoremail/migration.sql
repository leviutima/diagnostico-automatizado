/*
  Warnings:

  - Added the required column `colaboratorEmail` to the `clientEnterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."clientEnterprise" ADD COLUMN     "colaboratorEmail" TEXT NOT NULL;
