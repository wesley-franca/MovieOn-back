import { hasNoEnrollmentError } from "../../errors/hasNoEnrollmentError";
import { invalidMovieIdError } from "../../errors/invalidMovieIdError";
import { movieRatingConflictError } from "../../errors/movieRatingConflictError";
import { enrollmentRepository } from "../../repositories";
import { movieRepository } from "../../repositories/movie.repository";
import { movieRatingRepository } from "../../repositories/movieRating.repository";
import { ratingMovieBody } from "../../types/movies.types";

async function postRatingMovie(userId: number, movieId: number, body: ratingMovieBody) {
  const enrollment = await enrollmentRepository.getByUserId(userId);
  if (!enrollment) throw hasNoEnrollmentError();

  if (isNaN(movieId)) throw invalidMovieIdError();
  const movie = await movieRepository.getByMovieId(movieId);
  if (!movie) throw invalidMovieIdError();

  const existingRatingMovie = await movieRatingRepository.getByMovieIdAndUserId({ userId, movieId });
  if (existingRatingMovie) throw movieRatingConflictError();

  return movieRatingRepository.create({ userId, movieId, liked: body.liked })
}

export const movieService = {
  postRatingMovie
};