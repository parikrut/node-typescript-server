"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("./routes/users"));
exports.default = (function () {
    var app = express_1.Router();
    app.get('/', function (req, res, next) {
        res.send('Welcome to backend created by krutik');
    });
    users_1.default(app);
    return app;
});
