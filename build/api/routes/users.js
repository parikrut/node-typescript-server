"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersController_1 = __importDefault(require("../../components/users/usersController"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var router = express_1.Router();
exports.default = (function (app) {
    app.use('/users', router);
    router.get('/', express_async_handler_1.default(usersController_1.default.listUsers));
    router.post('/signup', express_async_handler_1.default(usersController_1.default.signupUser));
    router.get('/login', express_async_handler_1.default(usersController_1.default.loginUser));
});
