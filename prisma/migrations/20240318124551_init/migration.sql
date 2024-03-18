/*
  Warnings:

  - Added the required column `paymentType` to the `project_payment_progres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_payment_progres" ADD COLUMN     "paymentType" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "payment_milestone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "milestoneId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "payment_milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_dispute" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "disputeId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "payment_dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_variance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "varainceId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "payment_variance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_milestone_milestoneId_paymentId_idx" ON "payment_milestone"("milestoneId", "paymentId");

-- CreateIndex
CREATE INDEX "payment_dispute_disputeId_paymentId_idx" ON "payment_dispute"("disputeId", "paymentId");

-- CreateIndex
CREATE INDEX "payment_variance_varainceId_paymentId_idx" ON "payment_variance"("varainceId", "paymentId");

-- AddForeignKey
ALTER TABLE "project_payment_progres" ADD CONSTRAINT "project_payment_progres_paymentType_fkey" FOREIGN KEY ("paymentType") REFERENCES "payment_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_milestone" ADD CONSTRAINT "payment_milestone_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "project_milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_milestone" ADD CONSTRAINT "payment_milestone_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "project_payment_progres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_dispute" ADD CONSTRAINT "payment_dispute_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "project_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_dispute" ADD CONSTRAINT "payment_dispute_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "project_payment_progres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_variance" ADD CONSTRAINT "payment_variance_varainceId_fkey" FOREIGN KEY ("varainceId") REFERENCES "variance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_variance" ADD CONSTRAINT "payment_variance_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "project_payment_progres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
