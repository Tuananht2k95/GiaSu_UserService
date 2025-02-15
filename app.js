import express from "express";
import router from "./src/routes/index.js";
import { responseJsonByStatus, responseError } from "./src/helpers/helpers.js";
import winston from "winston";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('storage'));
app.use('/', router);

app.use((err, req, res, next) => {
    winston.loggers.get('system').error(err);
    return responseJsonByStatus(
        res,
        responseError(err),
        400
    );
    next();
});

export default app;