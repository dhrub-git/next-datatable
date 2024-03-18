-- AlterTable
ALTER TABLE "project_disputes" ALTER COLUMN "released_date" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "variance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(255) NOT NULL,
    "updatedBy" VARCHAR(255) NOT NULL,
    "change" VARCHAR(255) NOT NULL,
    "milestoneId" INTEGER NOT NULL,
    "disputeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "varianceType" INTEGER NOT NULL,

    CONSTRAINT "variance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variance_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "variance_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variance_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "variance_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variance" ADD CONSTRAINT "variance_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "project_milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variance" ADD CONSTRAINT "variance_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "project_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variance" ADD CONSTRAINT "variance_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "variance_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variance" ADD CONSTRAINT "variance_varianceType_fkey" FOREIGN KEY ("varianceType") REFERENCES "variance_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
