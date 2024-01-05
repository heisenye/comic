"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var cors = require("@koa/cors");
var serve = require("koa-static");
var ratelimit = require("koa-ratelimit");
var bodyparser_1 = require("@koa/bodyparser");
var index_1 = require("./router/index");
var comics_1 = require("./router/comics");
var user_1 = require("./router/user");
var logger_1 = require("./logger");
var status_1 = require("./constants/status");
var response_1 = require("./utils/response");
// import Middleware from './utils/middleware'
var app = new Koa();
app.use(cors({
    exposeHeaders: ['Retry-After']
}));
// app.use(Middleware.checkReferer)
app.use(ratelimit({
    driver: 'memory',
    db: new Map(),
    duration: 60000,
    id: function (ctx) { return ctx.ip; },
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
    },
    max: 120,
    disableHeader: false
}));
app.use(serve(__dirname + '/public'));
app.use((0, bodyparser_1.bodyParser)());
app.use(index_1.default.routes());
app.use(comics_1.default.routes()).use(comics_1.default.allowedMethods());
app.use(user_1.default.routes()).use(user_1.default.allowedMethods());
app.on('error', function (err, ctx) {
    logger_1.default.error(err);
    ctx.response.status = status_1.ResponseCode.Internal_Server_Error;
    ctx.body = response_1.default.UnknownError(err);
});
var run = function (port) {
    return app.listen(port, function () {
        logger_1.default.info("Server is running on port ".concat(port));
    });
};
exports.default = run;
