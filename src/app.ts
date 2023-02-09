import express from "express";
import cors from "cors";
import { connectDb } from "./config/database";
import { userRouter } from "./modules/users/user.router";
import { authenticationRouter } from "./modules/authentication/authentication.router";
import { enrollmentRouter } from "./modules/enrollment/enrollment.router";
import { movieRouter } from "./modules/movies/movies.router";

connectDb();
const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/", async (_req, res) => { res.send("Ok"); })
    .use("/users", userRouter)
    .use("/auth", authenticationRouter)
    .use("/enrollment", enrollmentRouter)
    .use("/movies", movieRouter);

export default app;
