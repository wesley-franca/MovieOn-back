import { Request, Response } from "express";
import httpStatus from "http-status";
import { newUserSchema } from "../../schemas/user.schemas";
import { cleanText } from "../../utils/cleanText";
import { userService } from "./users.service";
import { newUserBody } from "../../types/users.type";

export async function signUpUser(req: Request, res: Response) {
    let body = req.body as newUserBody;

    const bodyValidation = newUserSchema.validate(body, { abortEarly: false });
    if (bodyValidation.error) return res.status(httpStatus.BAD_REQUEST).send(bodyValidation.error.message);
    
    body = {
        email: cleanText(body.email),
        password: cleanText(body.password),
    };

    try {
        await userService.userSignUp(body);
    } catch (error) {
        if(error.name === "duplicatedEmailError") {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        if(error.name === "invalidPasswordFormatError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(201);
}
