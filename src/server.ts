import "./config/envs";
import app from "./app";

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${process.env.PORT}`);
});
