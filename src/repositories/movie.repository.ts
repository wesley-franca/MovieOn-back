import { connectDb } from "../config/database";

const prisma = connectDb();

function getByMovieId(movieId: number) {
  return prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
}

export const movieRepository = {
  getByMovieId,
};
