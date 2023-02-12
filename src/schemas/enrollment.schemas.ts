import joi from "joi";

export const newEnrollmentSchema = joi.object({
    name: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    instagram: joi.string().trim().required(),
    whatsapp: joi.string().trim().required(),
    biography: joi.string().trim().required(),
    birthday: joi.string().trim().required()
});
