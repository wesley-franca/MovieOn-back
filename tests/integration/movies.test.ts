import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { prisma } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users.factory";
import {  generateEnrollment, generateValidSession } from "../factories/enrollment.factory";
import { generateRatedMovie, generateValidMovieBody, getValidMovieId } from "../factories/movies.factory";

const server = supertest(app);

beforeEach(async () => {
  await cleanDb(prisma);
});

describe("POST /movie/:movieId", () => {
  it("should respond with status 401 when token is not given", async () => {
    const response = await server.post("/movies/0");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 when token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/movies/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/movies/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const session = await generateValidSession(user);
      const token = session.token;

      const response = await server.post("/movies/0").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const user = await createUser();
      const session = await generateValidSession(user);
      const token = session.token;
      const validParam = await getValidMovieId();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.post("/movies/0").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      it("should respond with status 403 when user don't have an enrollment", async () => {
        const user = await createUser();
        const session = await generateValidSession(user);
        const token = session.token;
        const body = generateValidMovieBody();

        const response = await server.post("/movies/a").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.FORBIDDEN);
      });

      describe("when user has enrollment", () => {
        it("should respond with status 422 when route param is not a number", async () => {
          const user = await createUser();
          const session = await generateValidSession(user);
          const token = session.token;
          const body = generateValidMovieBody();
          await generateEnrollment(user.id);

          const response = await server.post("/movies/a").set("Authorization", `Bearer ${token}`).send(body);

          expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        });

        it("should respond with status 422 when route param is not a valid movie id", async () => {
          const user = await createUser();
          const session = await generateValidSession(user);
          const token = session.token;
          const body = generateValidMovieBody();
          await generateEnrollment(user.id);

          const response = await server.post("/movies/0").set("Authorization", `Bearer ${token}`).send(body);

          expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        });

        describe("when route param is a valid movie id", () => { });
        it("should respond with status 409 when movie is already rated by user", async () => {
          const user = await createUser();
          const session = await generateValidSession(user);
          const token = session.token;
          const body = generateValidMovieBody();
          const validParam = await getValidMovieId();
          await generateEnrollment(user.id);
          await generateRatedMovie({ userId: user.id, movieId: validParam, liked: body.liked });

          const response = await server.post(`/movies/${validParam}`).set("Authorization", `Bearer ${token}`).send(body);

          expect(response.status).toBe(httpStatus.CREATED);
        });

        it("should respond with status 201", async () => {
          const user = await createUser();
          const session = await generateValidSession(user);
          const token = session.token;
          const body = generateValidMovieBody();
          const validParam = await getValidMovieId();
          await generateEnrollment(user.id);

          const response = await server.post(`/movies/${validParam}`).set("Authorization", `Bearer ${token}`).send(body);

          expect(response.status).toBe(httpStatus.CREATED);
        });

        it("should create a new rated movie rating in db", async () => {
          const user = await createUser();
          const session = await generateValidSession(user);
          const token = session.token;
          const body = generateValidMovieBody();
          const validParam = await getValidMovieId();
          await generateEnrollment(user.id);

          await server.post(`/movies/${validParam}`).set("Authorization", `Bearer ${token}`).send(body);

          const movieRating = await prisma.movieRating.findFirst({
            where: { movieId: validParam }
          });

          expect(movieRating.movieId).toBe(validParam);
        });
      });
    });
  });
});
