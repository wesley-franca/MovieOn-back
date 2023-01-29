import { prisma } from "../../src/config/database";

type User = {
  email: string,
  password: string
}

export async function createUser(body: User) {
    await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    });
}
