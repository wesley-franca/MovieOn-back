import joi from "joi";

export const newUserSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
});

export const userSchema = newUserSchema;

export const passwordSchema = joi.object({
    password: joi
        .string()
        .trim()
        .required()
        .min(8)
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")) //at least 1 lower, 1 upper letter and a special char
});
