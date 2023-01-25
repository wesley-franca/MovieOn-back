import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var server = express();
server.use(cors()).use(express.json());
server.get("/", function (req, res) {
  return res.sendStatus(200);
});
server.listen(process.env.PORT, function () {
  return console.log("Listening on port " + process.env.PORT);
});
