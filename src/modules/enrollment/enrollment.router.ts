import { Router } from "express";
import { authenticateToken } from "../../middleware/authenticationMiddleware";

import { completeProfile } from "./enrollment.controller";

const enrollmentRouter = Router();

enrollmentRouter.post("/", authenticateToken, completeProfile);

export { enrollmentRouter };
