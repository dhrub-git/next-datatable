/*
  Warnings:

  - You are about to drop the column `contract_milestone` on the `project_milestone` table. All the data in the column will be lost.
  - You are about to drop the `customer_project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_project" DROP CONSTRAINT "customer_project_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customer_project" DROP CONSTRAINT "customer_project_projectId_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "customerId" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "project_milestone" DROP COLUMN "contract_milestone",
ADD COLUMN     "milestone_categoryId" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "customer_project";

-- CreateTable
CREATE TABLE "milestone_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "milestone_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_builderId_customerId_idx" ON "project"("builderId", "customerId");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_milestone" ADD CONSTRAINT "project_milestone_milestone_categoryId_fkey" FOREIGN KEY ("milestone_categoryId") REFERENCES "milestone_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
