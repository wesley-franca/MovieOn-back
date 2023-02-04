import { connectDb } from "../config/database";
import { newEnrollmentBody } from "../modules/enrollment/enrollment.types";

const prisma = connectDb();

function create( { 
    userId,
    name,
    lastName,
    instagram,
    whatsapp,
    biography,
    birthday,
}: newEnrollmentBody) { 
    return prisma.enrollment.create({
        data: {
            userId,
            name,
            lastName,
            instagram,
            whatsapp,
            biography,
            birthday
        }
    });
}

export const enrollmentRepository = {
    create
};
