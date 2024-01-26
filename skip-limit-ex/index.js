import express from "express";
import { data } from "./data.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const { limit, skip } = req.query;
    console.log(req.query);

    if (limit) {
        const toSend = data.slice(Number(skip), Number(skip) + Number(limit));

        res.json(toSend);
        return;
    }

    res.json(data);
});

app.listen(3000, () => {
    console.log("Sever running");
});
