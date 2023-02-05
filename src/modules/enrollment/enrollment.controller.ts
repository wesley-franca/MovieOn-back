import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { newEnrollmentSchema } from "../../schemas/enrollment.schemas";
import { cleanText } from "../../utils/cleanText";
import { enrollmentService } from "./enrollment.service";
import { newEnrollmentBody } from "../../types/enrollment.types";

export async function createEnrollment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    let body = req.body as newEnrollmentBody;
    
    const bodyValidation = newEnrollmentSchema.validate(body, { abortEarly: false });
    if (bodyValidation.error) return res.status(httpStatus.BAD_REQUEST).send(bodyValidation.error.message);
    
    body = {
        userId: userId,
        name: cleanText(body.name),
        lastName: cleanText(body.lastName),
        instagram: cleanText(body.instagram),
        whatsapp: cleanText(body.whatsapp),
        biography: cleanText(body.biography),
        birthday: new Date(body.birthday),
    };
    try {
        await enrollmentService.createEnrollment(body);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if(error.name === "invalidBirthdayDateError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getEnrollment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    try {
        const result = await enrollmentService.getEnrollment(userId);
        return res.status(httpStatus.CREATED).send(result); 
    } catch (error) {
        if(error.name === "hasNoEnrollmentError") {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
