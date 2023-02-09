import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { prisma } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users.factory";
import { generateValidErollmentBody, generateEnrollment, generateValidSession } from "../factories/enrollment.factory";

const server = supertest(app);

beforeEach(async () => {
    await cleanDb(prisma);
});

describe("POST /enrollment", () => {
    it("should respond with status 401 when token is not given", async () => {
        const response = await server.post("/enrollment");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 when token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when body is not given", async () => {
            const user = await createUser();
            const session = await generateValidSession(user);
            const token = session.token;
            const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
            const user = await createUser();
            const session = await generateValidSession(user);
            const token = session.token;
            const body = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when birthday date is not valid", async () => {
            const user = await createUser();
            const session = await generateValidSession(user);
            const token = session.token;
            const invalidBirthday = faker.word.verb();
            const body = generateValidErollmentBody({ birthday: invalidBirthday });

            const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        describe("when body is valid", () => {
            it("should respond with status 201 when body is valid", async () => {
                const user = await createUser();
                const session = await generateValidSession(user);
                const token = session.token;
                const body = generateValidErollmentBody({});

                const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                expect(response.status).toBe(httpStatus.CREATED);
            });

            it("should create a new enrollment in db", async () => {
                const user = await createUser();
                const session = await generateValidSession(user);
                const token = session.token;
                const body = generateValidErollmentBody({});

                await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                const enrollment = await prisma.enrollment.findFirst({
                    where: { name: body.name }
                });

                expect(enrollment.lastName).toBe(body.lastName);
            });
            describe("when user already have an enrollment", () => {
                it("should respond with status 201 and update the enrrolment if body is valid ", async () => {
                    const user = await createUser();
                    const session = await generateValidSession(user);
                    const token = session.token;
                    const body = generateValidErollmentBody({});
                    await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                    const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                    expect(response.status).toBe(httpStatus.CREATED);
                });
            });
        });
    });
});

describe("GET /enrollment", () => {
    it("should respond with status 401 when token is not given", async () => {
        const response = await server.get("/enrollment");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 when token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.get("/enrollment").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get("/enrollment").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", () => {
        it("should respond with status 404 if user don't have an enrollment", async () => {
            const user = await createUser();
            const session = await generateValidSession(user);
            const token = session.token;

            const response = await server.get("/enrollment").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it("should respond with status 200 and user enrollment data", async () => {
            const user = await createUser();
            const session = await generateValidSession(user);
            const token = session.token;
            const userId = user.id;
            const enrollment = await generateEnrollment(userId);

            const response = await server.get("/enrollment").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual(expect.objectContaining({
                id: enrollment.id,
                name: enrollment.name,
                lastName: enrollment.lastName,
                instagram: enrollment.instagram,
                whatsapp: enrollment.whatsapp,
                biography: enrollment.biography,
                birthday: enrollment.birthday.toISOString()
            }));
        });
    });
});
