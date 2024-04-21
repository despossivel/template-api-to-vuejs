/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_key" ON "Student"("name");
