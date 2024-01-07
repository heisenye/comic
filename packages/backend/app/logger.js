"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});
exports.default = logger;
