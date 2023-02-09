import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";

export function generateValidMovieBody() {
  return {
    liked: faker.datatype.boolean()
  };
}

export async function getValidMovieId() {
  const movie = await prisma.movie.findFirst();
  return movie.id;
}

type GenerateRatedMovie = {
  userId: number,
  movieId: number,
  liked: boolean
}

export async function generateRatedMovie({ userId, movieId, liked, }: GenerateRatedMovie) {
  return await prisma.movieRating.create({
    data: {
      userId,
      movieId,
      liked
    }
  });

}