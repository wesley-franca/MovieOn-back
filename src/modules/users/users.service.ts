import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../../errors/duplicatedEmailError";
import { invalidPasswordFormatError } from "../../errors/invalidPasswordFormatError";
import { userRepository } from "../../repositories";
import { passwordSchema } from "../../schemas/user.schemas";
import { newUserBody } from "../../types/users.type";

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
