import express from "express";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.static('storage'));
app.use('/', router);


app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
});

export default app;