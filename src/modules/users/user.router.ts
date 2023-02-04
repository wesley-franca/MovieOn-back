import { Router } from "express";
import { signUpUser } from "./users.controller";

const userRouter = Router();

userRouter.post("/", signUpUser);

export { userRouter };
