import app, { init } from "./app.js";

const port = +process.env.PORT || 4000;

app.get("/", (req, res) => {
    return res.sendStatus(200);
});

init().then(() => {
    app.listen(port, () => {
    /* eslint-disable-next-line no-console */
        console.log(`Server is listening on port ${port}.`);
    });
});
