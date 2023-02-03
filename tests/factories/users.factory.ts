import { prisma } from "../../src/config/database";
import bcrypt from "bcrypt";

// const prisma = connectDb();

type User = {
  email: string,
  password: string
}

export async function createUser(body: User) {
    const hashedPassword = await bcrypt.hash(body.password, 12) as string;
    await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword
        }
    });
}
