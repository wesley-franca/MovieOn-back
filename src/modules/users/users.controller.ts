import { Request, Response } from "express";
import httpStatus from "http-status";
import joi from "joi";
import { cleanText } from "../../utils/cleanText";
import { userService } from "./users.service";

const newUserSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"))
});

type newUserBody = {
  email: string,
  password: string
}

export async function signUpUser(req: Request, res: Response) {
    console.log(req.body);
    let body = req.body as newUserBody;

    const validation = newUserSchema.validate(body, { abortEarly: false });
    if (validation.error) return res.status(httpStatus.BAD_REQUEST).send(validation.error.message);
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
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(201);
}
