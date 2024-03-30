-- CreateTable
CREATE TABLE "builder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "updatedBy" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT 'null',

    CONSTRAINT "builder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managed_by" (
    "id" SERIAL NOT NULL,
    "builderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "updatedBy" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT 'null',

    CONSTRAINT "managed_by_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "builderId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "project_address_line_1" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_address_line_2" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_city" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_state" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_postcode" VARCHAR(255) NOT NULL DEFAULT 'null',
    "managed_by_id" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "customer_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,
    "builderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "project_name" VARCHAR(255) NOT NULL,
    "project_address_line_1" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_address_line_2" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_city" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_state" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_postcode" VARCHAR(255) NOT NULL DEFAULT 'null',
    "project_value" INTEGER NOT NULL,
    "managed_by_id" INTEGER NOT NULL,
    "project_end_date" DATE NOT NULL,
    "project_contract_details" VARCHAR(255) NOT NULL DEFAULT 'null',

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "project_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_project" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "customer_project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "builder_email_key" ON "builder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "managed_by_email_key" ON "managed_by"("email");

-- CreateIndex
CREATE INDEX "managed_by_builderId_idx" ON "managed_by"("builderId");

-- CreateIndex
CREATE INDEX "customer_builderId_idx" ON "customer"("builderId");

-- CreateIndex
CREATE INDEX "customer_project_customerId_projectId_idx" ON "customer_project"("customerId", "projectId");

-- AddForeignKey
ALTER TABLE "managed_by" ADD CONSTRAINT "managed_by_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "builder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "builder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "customer_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_managed_by_id_fkey" FOREIGN KEY ("managed_by_id") REFERENCES "managed_by"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "project_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "builder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_managed_by_id_fkey" FOREIGN KEY ("managed_by_id") REFERENCES "managed_by"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project" ADD CONSTRAINT "customer_project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project" ADD CONSTRAINT "customer_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
