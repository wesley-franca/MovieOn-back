import { Router } from "express";
import { authenticateTokenMiddleware } from "../../middleware/authenticationMiddleware";
import { createEnrollment, getEnrollment } from "./enrollment.controller";

const enrollmentRouter = Router();

enrollmentRouter
    .post("/", authenticateTokenMiddleware, createEnrollment)
    .get("/", authenticateTokenMiddleware, getEnrollment);

export { enrollmentRouter };
