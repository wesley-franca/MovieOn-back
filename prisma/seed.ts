import { Movie, PrismaClient } from "@prisma/client";
import TMDB from "../src/API/TMDB.api";
const prisma = new PrismaClient();

async function main() {

  let movies = await prisma.movie.findMany();

  if (movies.length === 0) {
    const NumberMoviesToInsert = 100; //TODO: change movie number to production
    const querys = NumberMoviesToInsert / 20;
    const moviesToInsert = [];

    for (let i = 1; i <= querys; i++) {
      const data = await TMDB.getTopRated(i.toString())
      data.results.map((movie) => {
        moviesToInsert.push({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          releasedAt: movie.release_date
        })
      });
    }

    await prisma.movie.createMany({
      data: moviesToInsert
    });

    movies = await prisma.movie.findMany();
    console.log({ movies });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
