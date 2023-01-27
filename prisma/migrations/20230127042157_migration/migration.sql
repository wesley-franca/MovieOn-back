/*
  Warnings:

  - You are about to drop the column `author` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `director` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "author",
ADD COLUMN     "director" VARCHAR(255) NOT NULL;
