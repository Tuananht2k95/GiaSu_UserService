import './loadEnvironment.js';
import app from "./app.js";
import connectMongoDB from './database/mongo.js';
import { logging } from './src/config/logging.js';

logging();

connectMongoDB.then(
    () => {
        console.log('connect mongoDB successfully');
    }
);

app;
