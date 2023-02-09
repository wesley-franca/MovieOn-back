import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";

export async function postMovieRating(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const movieId = "teste"

    try {
        // const result = await enrollmentService.getEnrollment(userId);
        // return res.status(httpStatus.CREATED).send(result); 
        return res.sendStatus(503);
    } catch (error) {
        if(error.name === "hasNoEnrollmentError") {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
