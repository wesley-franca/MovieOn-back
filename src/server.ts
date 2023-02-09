import "./config/envs";
import app from "./app";

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});
