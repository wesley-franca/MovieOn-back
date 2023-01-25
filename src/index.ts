import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors()).use(express.json());

server.get("/", (req, res) => {
    console.log(process.env.TESTE);
    return res.sendStatus(200);
});

server.listen(process.env.PORT, () => console.log("Listening on port " + process.env.PORT));
