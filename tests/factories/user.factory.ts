import { connectDb } from "../../src/config";

const prisma = connectDb();
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