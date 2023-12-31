"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ComicSchema = new mongoose_1.Schema({
    name: { type: String },
    otherNames: [String],
    author: String,
    chapters: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed']
    },
    tags: [String],
    viewCount: {
        type: Number,
        default: 0
    },
    favoriteCount: {
        type: Number,
        default: 0
    },
    coverImage: {
        chapter: {
            type: Number,
            default: 1
        },
        page: {
            type: Number,
            default: 1
        }
    },
    description: String,
    otherInfo: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
var Comic = (0, mongoose_1.model)('Comic', ComicSchema);
exports.default = Comic;
