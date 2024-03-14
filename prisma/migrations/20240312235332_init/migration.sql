/*
  Warnings:

  - You are about to drop the column `project_address_line_1` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `project_address_line_2` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `project_city` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `project_postcode` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `project_state` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `project_address_line_1` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_address_line_2` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_city` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_postcode` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_state` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "project_address_line_1",
DROP COLUMN "project_address_line_2",
DROP COLUMN "project_city",
DROP COLUMN "project_postcode",
DROP COLUMN "project_state",
ADD COLUMN     "address_line_1" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "address_line_2" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "city" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "postcode" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "state" VARCHAR(255) NOT NULL DEFAULT 'null';

-- AlterTable
ALTER TABLE "project" DROP COLUMN "project_address_line_1",
DROP COLUMN "project_address_line_2",
DROP COLUMN "project_city",
DROP COLUMN "project_postcode",
DROP COLUMN "project_state",
ADD COLUMN     "address_line_1" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "address_line_2" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "city" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "postcode" VARCHAR(255) NOT NULL DEFAULT 'null',
ADD COLUMN     "state" VARCHAR(255) NOT NULL DEFAULT 'null';
