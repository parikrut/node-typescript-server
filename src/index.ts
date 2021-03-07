import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import router from './api/index';
// Load DotEnv Environment Variables 
dotenv.config();

// Initialize Database Connection 
const mongoUri : any = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('connected', () => console.log('connected to mongo (*_*)'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

// Initialize Express
const app = express();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const server = http.createServer(app);
const options = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: [],
    },
};
server.listen(PORT, () => {
    // console.log(`Server Running on Port ${PORT}`);
});

import redis from 'redis'
import session from "express-session";
const RedisStore = require('connect-redis')(session);

let redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
// Initialized Redis
redisClient.on('error', function (err) {
    // console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('ready', () => {
    // console.log("Redis is ready.")
})
redisClient.on('connect', function (err) {
    // console.log('Connected to redis successfully');
});
// Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient}),
    secret: 'krutik$%^111',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

app.use('/', router());

export default app