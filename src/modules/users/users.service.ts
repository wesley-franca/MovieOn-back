import bcrypt from "bcrypt";
import { applicationErrors } from "../../errors/aplication.erros";
import { userRepository } from "../../repositories";

type newUserBody = {
  email: string,
  password: string
}

async function userSignUp({ email, password }: newUserBody) {
    await validateUniqueEmailOrFail(email);

    const hashedPassword = await bcrypt.hash(password, 12) as  string;
    return userRepository.create( email, hashedPassword);
}

async function validateUniqueEmailOrFail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) {
        throw applicationErrors.duplicatedEmailError();
    }
}

export const userService = {
    userSignUp,
};
