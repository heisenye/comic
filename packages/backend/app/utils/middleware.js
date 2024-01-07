"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var mongoose_1 = require("mongoose");
var response_1 = require("../utils/response");
var status_1 = require("../constants/status");
var jsonwebtoken_1 = require("jsonwebtoken");
var secretKey = process.env.SECRET_KEY;
var refererUrl = process.env.REFERER_URL;
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.checkReferer = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var referer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referer = ctx.request.header.referer;
                        if (!(referer && referer.startsWith(refererUrl))) return [3 /*break*/, 2];
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ctx.response.status = status_1.ResponseCode.Forbidden;
                        ctx.body = response_1.default.Forbidden();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Middleware.validateObjectId = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ctx.params.id;
                        if (!mongoose_1.Types.ObjectId.isValid(id)) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidId();
                        }
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Middleware.validateChapter = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var chapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chapter = ctx.params.chapter;
                        if (isNaN(Number(chapter))) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidChapter();
                        }
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Middleware.auth = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = ctx.header.authorization ? String(ctx.header.authorization).split(' ')[1] : null;
                        if (!token) {
                            ctx.response.status = status_1.ResponseCode.Unauthorized;
                            ctx.body = response_1.default.NoToken();
                            return [2 /*return*/];
                        }
                        try {
                            decoded = (0, jsonwebtoken_1.verify)(token, secretKey);
                            ctx.state.userId = decoded.id;
                        }
                        catch (error) {
                            ctx.response.status = status_1.ResponseCode.Unauthorized;
                            ctx.body = response_1.default.InvalidToken();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Middleware;
}());
exports.default = Middleware;
