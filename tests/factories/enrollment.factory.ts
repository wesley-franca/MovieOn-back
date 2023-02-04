import { prisma } from "../../src/config/database";
import jwt from "jsonwebtoken";
import { createUser } from "./users.factory";

export async function generateValidToken() {
    const user = await createUser();
    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET) as string;
    
    const session = await prisma.session.create({
        data: {
            userId,
            token
        }
    });
    return session.token;
}
