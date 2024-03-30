-- AlterTable
ALTER TABLE "project_disputes" ADD COLUMN     "milestoneId" INTEGER NOT NULL DEFAULT 13;

-- AddForeignKey
ALTER TABLE "project_disputes" ADD CONSTRAINT "project_disputes_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "project_milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
