import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { prisma } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users.factory";
import { generateValidToken } from "../factories/enrollment.factory";

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
        it("should respond with status 400 when when body is not given", async () => {
            const token = await generateValidToken();
  
            const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`);
      
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
            const token = await generateValidToken();
            const body = { [faker.lorem.word()]: faker.lorem.word() };
      
            const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);
      
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        describe("when body is valid", () => {
            const generateValidBody = () => ({
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                instagram: faker.lorem.word(),
                whatsapp: "(21)98999-9999",
                biography: faker.lorem.text(),
                birthday: faker.date.birthdate()
            });

            it("should respond with status 200 when body is valid", async () => {
                const token = await generateValidToken();
                const body = generateValidBody();

                const response = await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                expect(response.status).toBe(httpStatus.OK);
            });

            it("should create a new enrollment in db", async () => {
                const token = await generateValidToken();
                const body = generateValidBody();

                await server.post("/enrollment").set("Authorization", `Bearer ${token}`).send(body);

                const enrollment = await prisma.enrollment.findFirst({
                    where: { name: body.name }
                });

                expect(enrollment.lastName).toBe(body.lastName);
            });
        });
    });
});
