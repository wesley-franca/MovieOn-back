import { PrismaClient } from "@prisma/client";

export async function cleanDb(prisma: PrismaClient) {
    await prisma.user.deleteMany({});
}
