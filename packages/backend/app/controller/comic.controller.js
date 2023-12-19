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
var fs = require("fs");
var path = require("path");
var mongoose_1 = require("mongoose");
var comic_model_1 = require("../model/comic.model");
var comicChapter_model_1 = require("../model/comicChapter.model");
var favorite_model_1 = require("../model/favorite.model");
var response_1 = require("../utils/response");
var status_1 = require("../constants/status");
var sharp = require("sharp");
var ComicController = /** @class */ (function () {
    function ComicController() {
    }
    ComicController.prototype.getComics = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var comics, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, comic_model_1.default.find({})];
                    case 1:
                        comics = _a.sent();
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success({ data: comics });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        ctx.body = response_1.default.UnknownError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, comic, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = ctx.params.id;
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comic_model_1.default.findOne({ _id: id })];
                    case 1:
                        comic = _a.sent();
                        if (!comic) {
                            ctx.response.status = status_1.ResponseCode.Not_Found;
                            ctx.body = response_1.default.NoComic();
                            return [2 /*return*/];
                        }
                        ctx.body = response_1.default.Success({ data: comic });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        ctx.body = response_1.default.UnknownError(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getComicImages = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, chapter, comicImages, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = ctx.params, id = _a.id, chapter = _a.chapter;
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        if (isNaN(Number(chapter))) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidChapter();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comicChapter_model_1.default.findOne({ comicId: id, chapter: Number(chapter) })];
                    case 1:
                        comicImages = _b.sent();
                        if (!comicImages) {
                            ctx.response.status = status_1.ResponseCode.Not_Found;
                            ctx.body = response_1.default.NoComic();
                            return [2 /*return*/];
                        }
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success({ data: comicImages });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.error(error_3);
                        ctx.body = response_1.default.UnknownError(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getHistoryComics = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, historyComic, unorderedHistoryComics_1, orderedHistoryComics, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        ids = ctx.query.id;
                        if (!ids) {
                            ctx.response.status = status_1.ResponseCode.OK;
                            ctx.body = response_1.default.Success({ data: [] });
                            return [2 /*return*/];
                        }
                        if (!(typeof ids === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, comic_model_1.default.findOne({ _id: ids })];
                    case 1:
                        historyComic = _a.sent();
                        if (!historyComic) {
                            ctx.response.status = status_1.ResponseCode.Not_Found;
                            ctx.body = response_1.default.NoComic();
                            return [2 /*return*/];
                        }
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success({ data: [historyComic] });
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, comic_model_1.default.find({ _id: { $in: ids } })];
                    case 3:
                        unorderedHistoryComics_1 = _a.sent();
                        orderedHistoryComics = ids
                            .map(function (id) { return unorderedHistoryComics_1.find(function (comic) { return comic._id.toString() === id; }); })
                            .filter(function (comic) { return comic !== undefined; });
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success({ data: orderedHistoryComics });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error(error_4);
                        ctx.body = response_1.default.UnknownError(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.createFavoriteComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var favoriteRecord, userId, comicId, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        favoriteRecord = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 7]);
                        userId = ctx.state.userId;
                        comicId = ctx.request['body'].id;
                        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(comicId)) {
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, favorite_model_1.default.create({ userId: userId, comicId: comicId })];
                    case 2:
                        favoriteRecord = _a.sent();
                        return [4 /*yield*/, comic_model_1.default.updateOne({ _id: comicId }, { $inc: { favoriteCount: 1 } })];
                    case 3:
                        _a.sent();
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success({});
                        return [3 /*break*/, 7];
                    case 4:
                        error_5 = _a.sent();
                        if (!favoriteRecord) return [3 /*break*/, 6];
                        return [4 /*yield*/, favorite_model_1.default.deleteOne({ _id: favoriteRecord._id })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        console.error(error_5);
                        ctx.body = response_1.default.UnknownError(error_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.deleteFavoriteComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, comicId, deleteResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = ctx.state.userId;
                        comicId = ctx.params.id;
                        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(comicId)) {
                            console.log(111);
                            ctx.response.status = status_1.ResponseCode.Bad_Request;
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, favorite_model_1.default.deleteOne({
                                userId: userId,
                                comicId: comicId
                            })];
                    case 1:
                        deleteResult = _a.sent();
                        if (deleteResult.deletedCount === 0) {
                            ctx.response.status = status_1.ResponseCode.Not_Found;
                            ctx.body = response_1.default.NoComic();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comic_model_1.default.updateOne({ _id: comicId }, { $inc: { favoriteCount: -1 } })];
                    case 2:
                        _a.sent();
                        ctx.response.status = status_1.ResponseCode.OK;
                        ctx.body = response_1.default.Success();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error(error_6);
                        response_1.default.UnknownError(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getFavoriteComics = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, favorites, favoriteComics, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = ctx.state.userId;
                        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, favorite_model_1.default.find({ userId: userId }).populate('comicId')];
                    case 1:
                        favorites = _a.sent();
                        favoriteComics = favorites.map(function (favorite) { return favorite.comicId; });
                        ctx.body = response_1.default.Success({ data: favoriteComics });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error(error_7);
                        response_1.default.UnknownError(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getFavoriteComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, comicId, favorite, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = ctx.state.userId;
                        comicId = ctx.params.id;
                        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(comicId)) {
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, favorite_model_1.default.findOne({ userId: userId, comicId: comicId })];
                    case 1:
                        favorite = _a.sent();
                        if (favorite) {
                            ctx.body = response_1.default.Success({ data: true });
                            return [2 /*return*/];
                        }
                        ctx.body = response_1.default.Success({ data: false });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        console.error(error_8);
                        response_1.default.UnknownError(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.getSearchComics = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var keyword, searchComics, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        keyword = ctx.query.keyword;
                        console.log(keyword);
                        if (!keyword) {
                            ctx.body = response_1.default.Success({ data: [] });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comic_model_1.default.find({ name: { $regex: keyword, $options: 'i' } })];
                    case 1:
                        searchComics = _a.sent();
                        ctx.body = response_1.default.Success({ data: searchComics });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error(error_9);
                        response_1.default.UnknownError(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.createComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, author, status_2, tags, description, comic, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = ctx.request['body'], name_1 = _a.name, author = _a.author, status_2 = _a.status, tags = _a.tags, description = _a.description;
                        return [4 /*yield*/, comic_model_1.default.create({ name: name_1, author: author, status: status_2, tags: tags, description: description })];
                    case 1:
                        comic = _b.sent();
                        console.log(comic);
                        ctx.body = response_1.default.Success();
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _b.sent();
                        console.error(error_10);
                        response_1.default.UnknownError(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.updateComic = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, field, newVal, id, error_11;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = ctx.request['body'], field = _a.field, newVal = _a.newVal;
                        id = ctx.params.id;
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                            ctx.body = response_1.default.InValidId();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comic_model_1.default.updateOne({ _id: id }, (_b = {}, _b[field] = newVal, _b))];
                    case 1:
                        _c.sent();
                        ctx.body = response_1.default.Success();
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _c.sent();
                        console.error(error_11);
                        ctx.body = response_1.default.UnknownError(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComicController.prototype.createComicChapter = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var comicId, chapter, directoryPath_1, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, comicChapter_model_1.default.create({
                                comicId: ctx.params.id,
                                chapter: ctx.params.chapter,
                                pages: ctx.files.length
                            })];
                    case 1:
                        _a.sent();
                        comicId = ctx.params.id;
                        chapter = ctx.params.chapter;
                        fs.mkdirSync("./app/public/".concat(comicId, "/").concat(chapter), { recursive: true });
                        directoryPath_1 = path.resolve(__dirname, '../', "public/".concat(comicId, "/").concat(chapter));
                        ctx.files.forEach(function (file, index) {
                            var filename = "".concat(index + 1, ".webp");
                            var filePath = path.join(directoryPath_1, filename);
                            sharp(file.buffer)
                                .webp({ quality: 80 })
                                .toFile(filePath, function (err) {
                                console.log(err);
                            });
                        });
                        ctx.body = response_1.default.Success();
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        console.error(error_12);
                        response_1.default.UnknownError(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ComicController;
}());
exports.default = new ComicController();
