import { connectDb } from "../config/database";
import { movieRatingType } from "../types/movies.types";

const prisma = connectDb();

function getByMovieIdAndUserId({ userId, movieId }: movieRatingType) {
  return prisma.movieRating.findFirst({
    where: {
      userId,
      movieId
    }
  });
}

function create({ userId, movieId, liked }: movieRatingType) {
  return prisma.movieRating.create({
    data: {
      userId,
      movieId,
      liked
    }
  });
}


export const movieRatingRepository = {
  getByMovieIdAndUserId,
  create
};
