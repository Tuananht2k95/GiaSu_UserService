import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
});

export default app;