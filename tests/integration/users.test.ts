import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import app from "../../src/app";
import { prisma } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users.factory";

const server = supertest(app);

afterAll(async () => {
    await cleanDb(prisma);
});

beforeEach(async () => {
    await cleanDb(prisma);
});

describe("POST /users", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/users");

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body parameters are not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post("/users").send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body parameters are valid", () => {
        const generateValidBody = ({ email = faker.internet.email(), password = "#123123Ab" }) => ({
            email: email,
            password: password,
        });

        it("should respond with status 400 when email is not valid", async () => {
            const email = faker.lorem.word();
            const body = generateValidBody({ email });

            const response = await server.post("/users").send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when password is not valid", async () => {
            const password = faker.lorem.word();
            const body = generateValidBody({ password });

            const response = await server.post("/users").send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 409 when email is already registered as an user", async () => {
            const body = generateValidBody({});
            await createUser(body);

            const response = await server.post("/users").send(body);

            expect(response.status).toBe(httpStatus.CONFLICT);
        });

        it("should respond with status 201 and create a new user", async () => {
            const body = generateValidBody({});

            const response = await server.post("/users").send(body);

            expect(response.status).toBe(httpStatus.CREATED);
        });

        it("should save new user on db", async () => {
            const body = generateValidBody({});

            await server.post("/users").send(body);

            const user = await prisma.user.findUnique({
                where: { email: body.email },
            });
            expect(user).toEqual(
                expect.objectContaining({
                    email: body.email,
                }),
            );
        });
    });
});
