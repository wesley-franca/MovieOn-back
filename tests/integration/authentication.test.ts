import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users.factory";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

afterAll(async () => {
    await cleanDb(prisma);
});

describe("POST /auth/sign-in", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/auth/sign-in");

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body parameters are not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post("/auth/sign-in").send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body parameters are valid", () => {
        const generateValidBody = ({ email = faker.internet.email(), password = "#123123Ab" }) => ({
            email: email,
            password: password,
        });
        it("should respond with status 401 if there is no user for given email", async () => {
            const body = generateValidBody({});

            const response = await server.post("/auth/sign-in").send(body);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
        it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
            const email = "teste@email.com";
            const password = "@123123Ab";
            const body = generateValidBody({ email });
            await createUser(body);
            const bodyWithIncorrectPassword = generateValidBody({ email, password });

            const response = await server.post("/auth/sign-in").send(bodyWithIncorrectPassword);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
        describe("when credentials are valid", () => {
            it("should respond with status 200 when signIn is authorized and return the user token", async () => {
                const body = generateValidBody({});
                await createUser(body);
    
                const response = await server.post("/auth/sign-in").send(body);
    
                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toEqual(expect.objectContaining(
                    { token: expect.any(String) }
                ));
            });

            it("should save session in db", async () => {
                const body = generateValidBody({});
                await createUser(body);
    
                await server.post("/auth/sign-in").send(body);
    
                const session = await prisma.session.findFirst({});

                expect(session).toEqual(expect.objectContaining({
                    token: expect.any(String)
                }));
            });
        });
    });
});
