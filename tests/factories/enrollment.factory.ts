import { prisma } from "../../src/config/database";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

export async function generateValidSession(user: User) {
    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET) as string;
    
    return prisma.session.create({
        data: {
            userId,
            token
        }
    });
}

type enrollmentBody = {
    name?: string,
    lastName?: string,
    instagram?: string,
    whatsapp?: string,
    biography?: string,
    birthday?: Date | string
}

export function generateValidErollmentBody({ birthday=(faker.date.birthdate()) }: enrollmentBody) {
    return {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        instagram: faker.lorem.word(),
        whatsapp: "(21)98999-9999",
        biography: faker.lorem.text(),
        birthday
    };
}

export async function generateEnrollment(userId: number) {
    const body = generateValidErollmentBody({});
    return prisma.enrollment.create({
        data: {
            userId,
            name: body.name,
            lastName: body.lastName,
            instagram: body.instagram,
            whatsapp: body.whatsapp,
            biography: body.biography,
            birthday: new Date(body.birthday)
        }
    });
}
