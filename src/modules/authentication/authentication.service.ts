import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidEmailOrPasswordError } from "../../errors/invalidEmailOrPasswordError";
import { authenticationRepository, userRepository } from "../../repositories";

type userBody = {
    email: string,
    password: string
}

async function signIn({ email, password }: userBody) {
    const user = await getUserByEmailOrFail(email);
    const userId = user.id;
    
    await validatePasswordOrFail(password, user);
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET) as string;

    const session = await authenticationRepository.create(token, userId);
    return session; 
}

async function getUserByEmailOrFail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw invalidEmailOrPasswordError();
    return user;
}

async function validatePasswordOrFail(password: string, user: User) {
    const authentication = await bcrypt.compareSync(password, user.password);

    if(!authentication) throw invalidEmailOrPasswordError();
}

export const authenticationService = {
    signIn,
};
