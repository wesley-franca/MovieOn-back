import { prisma } from "../config/database";

async function create(token: string, userId: number) {
    return prisma.session.upsert({
        where: {
            userId
        },
        update: {
            token
        },
        create: {
            userId, 
            token
        },
    });
}

export const authenticationRepository = {
    create,
};
