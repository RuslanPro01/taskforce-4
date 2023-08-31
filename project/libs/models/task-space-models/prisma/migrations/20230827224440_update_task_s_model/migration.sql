/*
  Warnings:

  - The `city` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL DEFAULT 'Moscow';
