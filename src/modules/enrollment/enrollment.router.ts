import { Router } from "express";
import { authenticateTokenMiddleware } from "../../middleware/authenticationMiddleware";
import { completeProfile, getEnrollment } from "./enrollment.controller";

const enrollmentRouter = Router();

enrollmentRouter
    .post("/", authenticateTokenMiddleware, completeProfile)
    .get("/", authenticateTokenMiddleware, getEnrollment);

export { enrollmentRouter };
