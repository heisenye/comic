"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("../constants/message");
var status_1 = require("../constants/status");
var logger_1 = require("../logger");
var Response = /** @class */ (function () {
    function Response() {
    }
    Response.UnknownError = function (error, msg) {
        logger_1.default.error(error);
        return {
            code: status_1.ResponseCode.Internal_Server_Error,
            msg: msg || message_1.default['UNKNOWN_ERR']
        };
    };
    Response.Success = function (_a) {
        var _b = _a === void 0 ? {} : _a, data = _b.data, msg = _b.msg;
        return {
            code: status_1.ResponseCode.OK,
            msg: msg || message_1.default['SUCCESS'],
            data: data
        };
    };
    Response.InValidId = function (msg) {
        logger_1.default.error(msg || message_1.default['INVALID_ID']);
        return {
            code: status_1.ResponseCode.Bad_Request,
            msg: msg || message_1.default['INVALID_ID']
        };
    };
    Response.InValidChapter = function (msg) {
        logger_1.default.error(msg || message_1.default['INVALID_CHAPTER']);
        return {
            code: status_1.ResponseCode.Bad_Request,
            msg: msg || message_1.default['INVALID_CHAPTER']
        };
    };
    Response.NoComic = function (msg) {
        logger_1.default.error(msg || message_1.default['NO_COMIC']);
        return {
            code: status_1.ResponseCode.Bad_Request,
            msg: msg || message_1.default['NO_COMIC']
        };
    };
    Response.NoUser = function (msg) {
        logger_1.default.error(msg || message_1.default['NO_USER']);
        return {
            code: status_1.ResponseCode.Unauthorized,
            msg: msg || message_1.default['NO_USER']
        };
    };
    Response.NoToken = function (msg) {
        logger_1.default.error(msg || message_1.default['NO_TOKEN']);
        return {
            code: status_1.ResponseCode.Unauthorized,
            msg: msg || message_1.default['NO_TOKEN']
        };
    };
    Response.InvalidCredentials = function (msg) {
        logger_1.default.error(msg || message_1.default['INVALID_CREDENTIALS']);
        return {
            code: status_1.ResponseCode.Unauthorized,
            msg: msg || message_1.default['INVALID_CREDENTIALS']
        };
    };
    Response.InvalidToken = function (msg) {
        logger_1.default.error(msg || message_1.default['INVALID_TOKEN']);
        return {
            code: status_1.ResponseCode.Unauthorized,
            msg: msg || message_1.default['INVALID_TOKEN']
        };
    };
    return Response;
}());
exports.default = Response;
