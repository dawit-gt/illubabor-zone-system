-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('HISTORY', 'HISTORICAL_SITE', 'CULTURAL_TOPIC', 'ORG_INFO');

-- AlterTable
ALTER TABLE "Zone" ADD COLUMN     "boundaryEast" TEXT,
ADD COLUMN     "boundaryNorth" TEXT,
ADD COLUMN     "boundarySouth" TEXT,
ADD COLUMN     "boundaryWest" TEXT,
ADD COLUMN     "elevationMax" INTEGER,
ADD COLUMN     "elevationMin" INTEGER,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "officeAddress" TEXT,
ADD COLUMN     "officeHours" TEXT,
ADD COLUMN     "officePhones" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ruralKebeles" INTEGER,
ADD COLUMN     "urbanKebeles" INTEGER;

-- CreateTable
CREATE TABLE "ContentEntry" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" TEXT NOT NULL,
    "titleOm" TEXT,
    "titleAm" TEXT,
    "body" TEXT NOT NULL,
    "bodyOm" TEXT,
    "bodyAm" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "zoneId" TEXT NOT NULL,

    CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentEntry" ADD CONSTRAINT "ContentEntry_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
