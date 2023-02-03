import { prisma } from "../config/database";

function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

function create(email: string, hashedPassword: string) {
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        }
    });
}

export const userRepository = {
    findByEmail,
    create
};
