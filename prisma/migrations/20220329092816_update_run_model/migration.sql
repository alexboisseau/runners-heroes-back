/*
  Warnings:

  - You are about to drop the column `kilometers` on the `Run` table. All the data in the column will be lost.
  - Added the required column `meters` to the `Run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Run" DROP COLUMN "kilometers",
ADD COLUMN     "meters" INTEGER NOT NULL,
ALTER COLUMN "kilocalories" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
