"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crypto_1 = require("crypto");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        set: function (val) {
            var salt = (0, crypto_1.randomBytes)(8).toString('hex');
            var hash = (0, crypto_1.scryptSync)(val, salt, 64).toString('hex');
            return "".concat(salt, ":").concat(hash);
        }
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
