/*
  Warnings:

  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `MovieGenre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releasedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_genreId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "director",
DROP COLUMN "genreId",
DROP COLUMN "releaseAt",
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "releasedAt" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "title" SET DATA TYPE TEXT;
DROP SEQUENCE "Movie_id_seq";

-- DropTable
DROP TABLE "MovieGenre";
