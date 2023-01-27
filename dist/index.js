import express from "express";
import cors from "cors";
import { loadEnv } from "./config/envs.js";
loadEnv();
var server = express();
server.use(cors()).use(express.json());
server.get("/", function (req, res) {
    console.log(process.env.TESTE);
    return res.sendStatus(200);
});
server.listen(process.env.PORT, function () { return console.log("Listening on port " + process.env.PORT); });
