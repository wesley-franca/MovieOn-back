import app, { init } from "./app.js";
var port = +process.env.PORT || 4000;
app.get("/", function (req, res) {
    return res.sendStatus(200);
});
init().then(function () {
    app.listen(port, function () {
        /* eslint-disable-next-line no-console */
        console.log("Server is listening on port ".concat(port, "."));
    });
});
