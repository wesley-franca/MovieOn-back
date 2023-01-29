import express from "express";
import cors from "cors";

// import userRouter from "./modules/users/users.router";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/status", (_req, res) => res.send("Ok"));
// .use(userRouter);

export default app;
