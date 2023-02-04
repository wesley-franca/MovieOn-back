import { Response } from "express";
import httpStatus from "http-status";
import joi from "joi";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { cleanText } from "../../utils/cleanText";
import { enrollmentService } from "./enrollment.service";
import { newEnrollmentBody } from "./enrollment.types";

const newEnrollmentSchema = joi.object({
    name: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    instagram: joi.string().trim().required(),
    whatsapp: joi.string().trim().required(),
    biography: joi.string().trim().required(),
    birthday: joi.string().trim().required()
});

export async function completeProfile(req: AuthenticatedRequest, res: Response) {
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
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
