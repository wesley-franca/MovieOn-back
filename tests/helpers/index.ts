import { PrismaClient } from "@prisma/client";

export async function cleanDb(prisma: PrismaClient) {
    await prisma.session.deleteMany({});
    await prisma.enrollment.deleteMany({});
    await prisma.movieRating.deleteMany({});
    await prisma.user.deleteMany({});
}
