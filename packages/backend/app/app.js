"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var cors = require("@koa/cors");
var serve = require("koa-static");
var bodyparser_1 = require("@koa/bodyparser");
var index_1 = require("./router/index");
var comics_1 = require("./router/comics");
var user_1 = require("./router/user");
var logger_1 = require("./logger");
var app = new Koa();
app.use(cors());
app.use(serve(__dirname + '/public'));
app.use((0, bodyparser_1.bodyParser)());
app.use(index_1.default.routes());
app.use(comics_1.default.routes()).use(comics_1.default.allowedMethods());
app.use(user_1.default.routes()).use(user_1.default.allowedMethods());
var run = function (port) {
    return app.listen(port, function () {
        logger_1.default.info("Server is running on port ".concat(port));
    });
};
exports.default = run;
