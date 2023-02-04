import { prisma } from "../../src/config/database";
import bcrypt from "bcrypt";

export async function createUser(body={ email: "teste@email.com", password: "#123123Ab" }) {
    const hashedPassword = await bcrypt.hash(body.password, 12) as string;
    return prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword
        }
    });
}
