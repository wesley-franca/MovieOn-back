export type ratingMovieBody = {
  liked: boolean
};

export type movieRatingType = {
  userId?: number,
  movieId?: number,
  liked?: boolean
};