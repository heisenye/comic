"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    comicId: { type: mongoose_1.Types.ObjectId, ref: 'Comic', required: true },
    replies: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 }
}, {
    timestamps: true
});
var Comment = (0, mongoose_1.model)('Comment', CommentSchema);
exports.default = Comment;
