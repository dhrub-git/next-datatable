/*
  Warnings:

  - You are about to drop the column `milestone_categoryId` on the `project_milestone` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_milestone" DROP CONSTRAINT "project_milestone_milestone_categoryId_fkey";

-- AlterTable
ALTER TABLE "project_milestone" DROP COLUMN "milestone_categoryId";
