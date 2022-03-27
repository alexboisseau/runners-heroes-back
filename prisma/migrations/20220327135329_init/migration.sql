-- CreateEnum
CREATE TYPE "RunType" AS ENUM ('OUT', 'IN');

-- CreateEnum
CREATE TYPE "WeatherType" AS ENUM ('SUNY', 'SUN_AND_CLOUD', 'CLOUDY', 'RAINY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "kilometers" INTEGER NOT NULL,
    "kilocalories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" "RunType" NOT NULL,
    "startedDate" TIMESTAMP(3) NOT NULL,
    "weather" "WeatherType" NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
