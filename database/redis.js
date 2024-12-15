import { createClient } from "redis";

// const host = process.env.REDIS_HOST;
// const username = process.env.REDIS_USERNAME;
// const password = process.env.REDIS_PASSWORD;
const port = process.env.REDIS_PORT;

// const connectString = `redis://${password}@${host}:${port}`;
const connectString = 'redis://127.0.0.1:6379'
const configCilent = {
    url: connectString,
}

const redis = createClient(configCilent);
redis.on(
    'error',
    (err) => console.log(err)
)
redis.connect().then(
    () => console.log(`redis connected, port = ${port}`)
)

export default redis