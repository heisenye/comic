'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var mongoose_1 = require('mongoose')
var comment_model_1 = require('./comment.model')
mongoose_1.default.connect('mongodb://localhost:27017/acg').then(function () {
  console.log('connect success')
})
var comment = new comment_model_1.default({
  content: 'hello world',
  userId: '655d9aa249fba0d0321f4346',
  comicId: '64d4e7a7cccc4bf7d491a7e6'
})
comment.save().then(function () {
  console.log('save success')
})
