-- CreateTable
CREATE TABLE "project_milestone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "contract_milestone" VARCHAR(255) NOT NULL,
    "payment_progress" VARCHAR(255) NOT NULL,
    "actual_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "milestone_amount" VARCHAR(255) NOT NULL,
    "milestone_cumulative" VARCHAR(255) NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "project_milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_milestone_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "project_milestone_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_payment_progres" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "payment" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255) NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_reference" VARCHAR(255) NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "project_payment_progres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_payment_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "project_payment_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_disputes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "dispute_milestone" VARCHAR(255) NOT NULL,
    "dispute_category" VARCHAR(255) NOT NULL,
    "dispute_details" VARCHAR(255) NOT NULL,
    "released_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" VARCHAR(255) NOT NULL,
    "variation_amount" VARCHAR(255) NOT NULL,

    CONSTRAINT "project_disputes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_file" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "released_date" VARCHAR(255) NOT NULL,
    "milestone" VARCHAR(255) NOT NULL,
    "relates_to" VARCHAR(255) NOT NULL,
    "third_party" VARCHAR(255) NOT NULL,
    "uploaded_by" INTEGER NOT NULL,

    CONSTRAINT "project_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_milestone" ADD CONSTRAINT "project_milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_milestone" ADD CONSTRAINT "project_milestone_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "project_milestone_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payment_progres" ADD CONSTRAINT "project_payment_progres_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payment_progres" ADD CONSTRAINT "project_payment_progres_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "project_payment_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_disputes" ADD CONSTRAINT "project_disputes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_file" ADD CONSTRAINT "project_file_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
