import { Router } from "express";
import { authenticateTokenMiddleware } from "../../middleware/authenticationMiddleware";
import { postMovieRating } from "./movies.controller";

const movieRouter = Router();

movieRouter
  .post("/:movieId", authenticateTokenMiddleware, postMovieRating);

export { movieRouter };
