import express from "express";
import cors from "cors";

import { userRouter } from "./modules/users/user.router";
import { authenticationRouter } from "./modules/authentication/authentication.router";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/", (_req, res) => res.send("Ok"))
    .use("/users", userRouter)
    .use("/auth", authenticationRouter);

export default app;
