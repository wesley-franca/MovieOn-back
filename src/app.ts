import express from "express";
import cors from "cors";

import { userRouter } from "./modules/users/user.router";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/", (_req, res) => res.send("Ok"))
    .use("/users", userRouter);

export default app;
