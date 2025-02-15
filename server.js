import './loadEnvironment.js';
import app from "./app.js";
import { connectMongoDB } from './database/mongo.js';
import { logging } from './src/config/logging.js';
import { Server } from 'socket.io';
import { createServer } from "http";
import redis from './database/redis.js';

logging();

connectMongoDB.then(
    () => {
        console.log('connect MongoDB success');
    }
)
redis();

const httpServer = createServer(app)
const io = new Server(httpServer, { 
    cors: {
        origin: 'http://localhost:3000',
    }
 });
io.on("connection", (socket) => {
    console.log('id', socket.id);
    
    socket.emit('test', 1);
})

httpServer.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
});
