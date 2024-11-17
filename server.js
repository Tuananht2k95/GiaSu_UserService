import './loadEnvironment.js';
import app from "./app.js";
import connectMongoDB from './database/mongo.js';

connectMongoDB.then(
    () => {
        console.log('connect mongoDB successfully');
    }
);

app;
