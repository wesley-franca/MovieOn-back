import bcrypt from "bcrypt";
import joi from "joi";
import { duplicatedEmailError } from "../../errors/duplicatedEmailError";
import { invalidPasswordFormatError } from "../../errors/invalidPasswordFormatError";
import { userRepository } from "../../repositories";

type newUserBody = {
    email: string,
    password: string
}

const passwordSchema = joi.object({
    password: joi
        .string()
        .trim()
        .required()
        .min(8)
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")) //at least 1 lower, 1 upper letter and a special char
});

async function userSignUp({ email, password }: newUserBody) {
    await validatePasswordFormatOrFail(password);
    await validateUniqueEmailOrFail(email);

    const hashedPassword = await bcrypt.hash(password, 12) as string;
    return userRepository.create(email, hashedPassword);
}

async function validatePasswordFormatOrFail(password: string) {
    const PasswordValidation = passwordSchema.validate({ password }, { abortEarly: false });
    if (PasswordValidation.error) throw invalidPasswordFormatError();
}

async function validateUniqueEmailOrFail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) throw duplicatedEmailError();
}

export const userService = {
    userSignUp,
};
