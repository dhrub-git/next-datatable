-- AlterTable
ALTER TABLE "project_milestone" ADD COLUMN     "milestone_categoryId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "project_milestone" ADD CONSTRAINT "project_milestone_milestone_categoryId_fkey" FOREIGN KEY ("milestone_categoryId") REFERENCES "milestone_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
