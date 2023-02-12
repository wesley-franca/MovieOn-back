import { Router } from "express";
import { authenticateTokenMiddleware } from "../../middleware/authenticationMiddleware";
import { postMovieRating, getMovies } from "./movies.controller";

const movieRouter = Router();

movieRouter
  .get("/", authenticateTokenMiddleware, getMovies)
  .post("/:movieId", authenticateTokenMiddleware, postMovieRating);

export { movieRouter };
