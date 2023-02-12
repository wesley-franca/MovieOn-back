import { connectDb } from "../config/database";

const prisma = connectDb();

function getByMovieId(movieId: number) {
  return prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
}

function get(userId: number) {
  return prisma.movie.findMany({
    where: {
      LikedMovies: {
        every: { userId }
      }
    },
    take: 20
  });
}

export const movieRepository = {
  getByMovieId,
  get
};
