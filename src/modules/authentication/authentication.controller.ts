import { Request, Response } from "express";
import httpStatus from "http-status";
import joi from "joi";
import { cleanText } from "../../utils/cleanText";
import { authenticationService } from "./authentication.service";

const userSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
});

type userBody = {
  email: string,
  password: string
}

export async function signIn(req: Request, res: Response) {
    let body = req.body as userBody;

    const bodyValidation = userSchema.validate(body, { abortEarly: false });
    if (bodyValidation.error) return res.status(httpStatus.BAD_REQUEST).send(bodyValidation.error.message);
    
    body = {
        email: cleanText(body.email),
        password: cleanText(body.password),
    };
    try {
        const result = await authenticationService.signIn(body);
        return res.status(httpStatus.OK).send({ token: result.token });
    } catch (error) {
        if(error.name === "invalidEmailOrPasswordError") { 
            return res.status(httpStatus.UNAUTHORIZED).send(error);
        }
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
