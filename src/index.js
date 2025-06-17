const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');

//init app
const PORT = process.env.PORT || 4000;
const app = express();

//connect to redis
const REDIS_HOST = 'redis';
const REDIS_POIRT = 6379;

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_POIRT}`,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("connected to redis.."))
redisClient.connect();

//connect db postgres
// const POSTGRES_USER = 'root';
// const POSTGRES_PASSOWRD = 'example';
// const POSTGRES_HOST = 'postgres';
// const POSTGRES_PORT = 5432;

// const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSOWRD}@${POSTGRES_HOST}:${POSTGRES_PORT}`

// const client = new Client({
//     connectionString,
// });

// client
//     .connect()
//     .then(() => console.log('connected to postgres..'))
//     .catch((err) => console.log('faild to connect to postgres : ', err));

//connect db mongo
const DB_USER = 'root';
const DB_PASSOWRD = 'example';
const DB_HOST = 'mongo';
const DB_PORT = 27017;

const URI = `mongodb://${DB_USER}:${DB_PASSOWRD}@${DB_HOST}:${DB_PORT}`;

mongoose
    .connect(URI)
    .then(() => console.log('connected to db..'))
    .catch((err) => console.log('faild to connect to db : ', err));


app.get('/', (req, res) => {
    redisClient.set("products", "products...");
    res.send('<h1>Hello NodeJs!<h1/>')
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`
        <h1>Hello NodeJs!<h1/>
        <h2>${products}<h2/>
        `);
});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));
