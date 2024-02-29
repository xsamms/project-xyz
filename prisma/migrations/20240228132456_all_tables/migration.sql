/*
  Warnings:

  - You are about to drop the column `isPhoneVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mobileNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('Booking', 'Proposal', 'Collaboration');

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropIndex
DROP INDEX "User_telephone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPhoneVerified",
DROP COLUMN "name",
DROP COLUMN "telephone",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "mobileNumber" TEXT,
ADD COLUMN     "verificationType" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Goal";

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER[],
    "agencyName" TEXT NOT NULL,
    "regNumber" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency_Manager" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Agency_Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calender" (
    "id" SERIAL NOT NULL,
    "talentId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "agencyManagerId" INTEGER NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventVenue" TEXT NOT NULL,
    "eventCity" TEXT NOT NULL,
    "eventCountry" TEXT NOT NULL,
    "eventDate" DATE NOT NULL,
    "eventTime" TIME NOT NULL,

    CONSTRAINT "Calender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "usersId" INTEGER[],

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "talentId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "agencyManagerId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "type" "InquiryType" NOT NULL DEFAULT 'Booking',
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "attachment" TEXT[],
    "eventType" TEXT NOT NULL,
    "eventVenue" TEXT NOT NULL,
    "eventCity" TEXT NOT NULL,
    "eventCountry" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "talentId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "billOption" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "logisticInfo" TEXT NOT NULL,
    "logisticFee" INTEGER NOT NULL,
    "TnC" TEXT NOT NULL,
    "totalFee" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "agencyName" TEXT NOT NULL,
    "regNumber" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agencyId" INTEGER,
    "managerId" INTEGER,
    "agencyManagerId" INTEGER,
    "stageName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "bookingPrice" INTEGER,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "talentId" INTEGER[],
    "agencyManagerId" INTEGER[],
    "title" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_userId_key" ON "Agency"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_teamId_key" ON "Agency"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_Manager_userId_key" ON "Agency_Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_Manager_agencyId_key" ON "Agency_Manager"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Calender_talentId_key" ON "Calender"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "Calender_managerId_key" ON "Calender"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "Calender_agencyId_key" ON "Calender"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Calender_agencyManagerId_key" ON "Calender"("agencyManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_talentId_key" ON "Inquiry"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_managerId_key" ON "Inquiry"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_agencyId_key" ON "Inquiry"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_agencyManagerId_key" ON "Inquiry"("agencyManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_email_key" ON "Inquiry"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_talentId_key" ON "Invoice"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_managerId_key" ON "Invoice"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_agencyId_key" ON "Invoice"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_userId_key" ON "Talent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_agencyId_key" ON "Talent"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_managerId_key" ON "Talent"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_agencyManagerId_key" ON "Talent"("agencyManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_stageName_key" ON "Talent"("stageName");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agency_Manager" ADD CONSTRAINT "Agency_Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agency_Manager" ADD CONSTRAINT "Agency_Manager_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_agencyManagerId_fkey" FOREIGN KEY ("agencyManagerId") REFERENCES "Agency_Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_agencyManagerId_fkey" FOREIGN KEY ("agencyManagerId") REFERENCES "Agency_Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_agencyManagerId_fkey" FOREIGN KEY ("agencyManagerId") REFERENCES "Agency_Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_agencyManagerId_fkey" FOREIGN KEY ("agencyManagerId") REFERENCES "Agency_Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
