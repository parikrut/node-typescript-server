"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var index_1 = __importDefault(require("./api/index"));
// Load DotEnv Environment Variables 
dotenv_1.default.config();
// Initialize Database Connection 
var mongoUri = process.env.MONGO_CONNECTION_STRING;
mongoose_1.default.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.on('connected', function () { return console.log('connected to mongo (*_*)'); });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useCreateIndex', true);
// Initialize Express
var app = express_1.default();
var PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1.default());
app.use('/', index_1.default());
var server = http_1.default.createServer(app);
var options = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: [],
    },
};
server.listen(PORT, function () {
    console.log("Server Running on Port " + PORT);
});
// Initialized Socket
var io = new socket_io_1.Server(server, options);
// Redis Configure with store
var express_session_1 = __importDefault(require("express-session"));
var store = require('connect-redis');
var RedisStore = store(express_session_1.default);
var redisOptions = {
    host: "localhost",
    logErrors: true,
    port: 1234,
    prefix: "myapp:",
    ttl: 6.04e+8
};
app
    .use(express_session_1.default({
    cookie: {
        maxAge: 6.04e+8 // week in seconds
    },
    resave: false,
    rolling: true,
    saveUninitialized: true,
    secret: "secret",
    store: new RedisStore({ client: redisOptions })
}));
// let redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379
// });
// // Initialized Redis
// redisClient.on('error', function (err) {
//     console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//     console.log('Connected to redis successfully');
// });
// // Configure session middleware
// app.use(session({
//     store: new RedisStore({ client: redisClient}),
//     secret: 'krutik$%^111',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // if true only transmit cookie over https
//         httpOnly: false, // if true prevent client side JS from reading the cookie 
//         maxAge: 1000 * 60 * 10 // session max age in miliseconds
//     }
// }))
