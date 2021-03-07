"use strict";
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
// const { Schema, model } = mongoose;
// export interface IUser extends mongoose.Document {
//     username: String
//     email: String
//     password: any
//     createdAt: Date
//     passwordChangedAt: Number
// }
// const UserSchema = new Schema(
//     {
//         username: {
//             type: String,
//             required: [true, "Please provide your name"],
//             unique: [true,  'User is already exists']
//         },
//         email: {
//             type: String,
//             required: [true, 'Please provide your email'],
//             lowercase: true,
//         },
//         password: {
//             type: String,
//             required: [true, 'Please provide a password'],
//             select: false
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now()
//         }
//     }
// );
// UserSchema.pre('save', async function (this: IUser, next) {
//     const user = this;
//     // Encrypt the password
//     user.password = await bcrypt.hash(user.password, 12);
//     user.passwordChangedAt = Date.now() - 1000;
//     next();
// });
// // Check if the user password is correct
// UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//     return await bcrypt.compare(candidatePassword, userPassword);
// };
// export default model('User', UserSchema);
var bcrypt = __importStar(require("bcryptjs"));
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide your name"],
        unique: [true, 'User is already exists']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
// Check if the user password is correct
exports.userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(candidatePassword, userPassword)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this;
                    // Encrypt the password
                    _a = user;
                    return [4 /*yield*/, bcrypt.hash(user.password, 12)];
                case 1:
                    // Encrypt the password
                    _a.password = _b.sent();
                    user.passwordChangedAt = Date.now() - 1000;
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// userSchema.method('comparePassword', async function (password: string): boolean {
//     if (bcrypt.compareSync(password, this.password)) return true;
//     return false;
// });
// userSchema.static('hashPassword', (password: string): string => {
//     return bcrypt.hashSync(password);
// });
// export const User: IUserModel = >('User', userSchema);
// export default User;
exports.User = mongoose_1.model('User', exports.userSchema);
exports.default = exports.User;
