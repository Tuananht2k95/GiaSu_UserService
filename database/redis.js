import { createClient } from "redis";

const host = process.env.REDIS_HOST;
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;
const port = process.env.REDIS_PORT;

const connectString = `redis://${username}:${password}@${host}:${port}`;
const configCilent = {
    url: connectString,
}
console.log(connectString);


const redis = () => {
    const client = createClient(configCilent);
    client.on(
        'error',
        (err) => console.log(err)
    )
    
    client.connect().then(
        () => console.log(`redis connected, port = ${port}`)
    )
    return client
}



export default redis