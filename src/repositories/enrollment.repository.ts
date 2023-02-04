import { connectDb } from "../config/database";
import { newEnrollmentBody } from "../types/enrollment.types";

const prisma = connectDb();

function upsert( { 
    userId,
    name,
    lastName,
    instagram,
    whatsapp,
    biography,
    birthday,
}: newEnrollmentBody) { 
    return prisma.enrollment.upsert({
        where: {
            userId
        },
        update: {
            name,
            lastName,
            instagram,
            whatsapp,
            biography,
            birthday,
        },
        create: {
            userId,
            name,
            lastName,
            instagram,
            whatsapp,
            biography,
            birthday
        },
    });
}

function getBuUserId(userId: number) { 
    return prisma.enrollment.findUnique({
        where: {
            userId
        }
    });
}

export const enrollmentRepository = {
    upsert,
    getBuUserId
};
