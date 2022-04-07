/*
  Warnings:

  - Changed the type of `startedDate` on the `Run` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Run" DROP COLUMN "startedDate",
ADD COLUMN     "startedDate" TIMESTAMP(3) NOT NULL;
