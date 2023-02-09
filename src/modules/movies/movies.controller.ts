import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { ratingMovieSchema } from "../../schemas/movies.schemas";
import { ratingMovieBody } from "../../types/movies.types";
import { movieService } from "./movies.service";

export async function postMovieRating(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const movieId = Number(req.params.movieId);
    const body = req.body as ratingMovieBody;

    const bodyValidation = ratingMovieSchema.validate(body, { abortEarly: false });
    if (bodyValidation.error) return res.status(httpStatus.BAD_REQUEST).send(bodyValidation.error.message);

    try {
        await movieService.postRatingMovie(userId, movieId, body);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error.name === "hasNoEnrollmentError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        if (error.name === "invalidMovieIdError") {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
        }
        if (error.name === "movieRatingConflictError") {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
