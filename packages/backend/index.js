"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var app_1 = require("./app/app");
var mongoose_1 = require("./app/mongoose");
(0, mongoose_1.default)();
(0, app_1.default)(888);
