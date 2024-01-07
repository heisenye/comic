"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCode = void 0;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["OK"] = 200] = "OK";
    ResponseCode[ResponseCode["Bad_Request"] = 400] = "Bad_Request";
    ResponseCode[ResponseCode["Unauthorized"] = 401] = "Unauthorized";
    ResponseCode[ResponseCode["Forbidden"] = 403] = "Forbidden";
    ResponseCode[ResponseCode["Not_Found"] = 404] = "Not_Found";
    ResponseCode[ResponseCode["Conflict"] = 409] = "Conflict";
    ResponseCode[ResponseCode["Internal_Server_Error"] = 500] = "Internal_Server_Error";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
