/*
  Warnings:

  - You are about to drop the column `disputeId` on the `variance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "variance" DROP CONSTRAINT "variance_disputeId_fkey";

-- AlterTable
ALTER TABLE "variance" DROP COLUMN "disputeId";

-- CreateTable
CREATE TABLE "dispute_variance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "disputeId" INTEGER NOT NULL,
    "varianceId" INTEGER NOT NULL,

    CONSTRAINT "dispute_variance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "dispute_variance_disputeId_varianceId_idx" ON "dispute_variance"("disputeId", "varianceId");

-- AddForeignKey
ALTER TABLE "dispute_variance" ADD CONSTRAINT "dispute_variance_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "project_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_variance" ADD CONSTRAINT "dispute_variance_varianceId_fkey" FOREIGN KEY ("varianceId") REFERENCES "variance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
