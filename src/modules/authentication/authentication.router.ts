import { Router } from "express";

import { signIn } from "./authentication.controller";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", signIn);

export { authenticationRouter };
