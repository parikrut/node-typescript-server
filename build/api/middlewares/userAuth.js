"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthentication = void 0;
var verifyAuthentication = function (req, res, next) {
    try {
        if (req.session.user) {
            res.json({ "message": "Welcome " + req.session.user + "." });
        }
        else {
            res.json({ "message": "Please Login or Signup to continue " });
        }
    }
    catch (error) {
        res.status(404).json({ "message": "User not find" });
    }
};
exports.verifyAuthentication = verifyAuthentication;
