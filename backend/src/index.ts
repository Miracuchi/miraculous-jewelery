import express from "express"

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Point final");
});

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
