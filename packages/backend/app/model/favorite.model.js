'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var mongoose_1 = require('mongoose')
var FavoriteSchema = new mongoose_1.Schema(
  {
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    comicId: { type: mongoose_1.Types.ObjectId, ref: 'Comic', required: true }
  },
  { timestamps: true }
)
exports.default = (0, mongoose_1.model)('Favorite', FavoriteSchema)
