'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var path = require('path')
var user_model_1 = require('../model/user.model')
var crypto_1 = require('crypto')
var jsonwebtoken_1 = require('jsonwebtoken')
var status_1 = require('../constants/status')
var response_1 = require('../utils/response')
var sharp = require('sharp')
var secretKey = process.env.SECRET_KEY
var UserController = /** @class */ (function () {
  function UserController() {}
  UserController.prototype.getUsers = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var users
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, user_model_1.default.find({})]
          case 1:
            users = _a.sent()
            ctx.body = response_1.default.Success({ data: users })
            return [2 /*return*/]
        }
      })
    })
  }
  UserController.prototype.getUser = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var username, user
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            username = ctx.params.username
            return [4 /*yield*/, user_model_1.default.findOne({ username: username })]
          case 1:
            user = _a.sent()
            if (!user) {
              ctx.response.status = status_1.ResponseCode.Unauthorized
              ctx.body = response_1.default.NoUser()
              return [2 /*return*/]
            }
            ctx.body = response_1.default.Success({ data: user })
            return [2 /*return*/]
        }
      })
    })
  }
  UserController.prototype.login = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, username, pwd, user, _b, salt, storedHash, hash, token, createdAt, id
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = ctx.request['body']), (username = _a.username), (pwd = _a.pwd)
            return [4 /*yield*/, user_model_1.default.findOne({ username: username })]
          case 1:
            user = _c.sent()
            if (!user) {
              ctx.response.status = status_1.ResponseCode.Unauthorized
              ctx.body = response_1.default.NoUser()
              return [2 /*return*/]
            }
            ;(_b = user.password.split(':')), (salt = _b[0]), (storedHash = _b[1])
            hash = (0, crypto_1.scryptSync)(pwd, salt, 64).toString('hex')
            if (hash !== storedHash) {
              ctx.response.status = status_1.ResponseCode.Unauthorized
              ctx.body = response_1.default.InvalidCredentials()
              return [2 /*return*/]
            }
            token = (0, jsonwebtoken_1.sign)({ id: user._id }, secretKey, { expiresIn: '14d' })
            ;(createdAt = user.createdAt), (id = user._id)
            ctx.body = response_1.default.Success({
              data: {
                id: id,
                username: username,
                createdAt: new Date(createdAt).toLocaleDateString(),
                token: token
              }
            })
            return [2 /*return*/]
        }
      })
    })
  }
  UserController.prototype.register = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, username, pwd, existingUser, user
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            ;(_a = ctx.request['body']), (username = _a.username), (pwd = _a.pwd)
            return [4 /*yield*/, user_model_1.default.findOne({ username: username })]
          case 1:
            existingUser = _b.sent()
            if (existingUser) {
              ctx.response.status = status_1.ResponseCode.Conflict
              ctx.body = response_1.default.UserAlreadyExists()
              return [2 /*return*/]
            }
            return [4 /*yield*/, user_model_1.default.create({ username: username, password: pwd })]
          case 2:
            user = _b.sent()
            ctx.body = response_1.default.Success({ data: user })
            return [2 /*return*/]
        }
      })
    })
  }
  UserController.prototype.profile = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var id, user, username, createdAt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = ctx.state.userId
            return [4 /*yield*/, user_model_1.default.findById(id)]
          case 1:
            user = _a.sent()
            if (!user) {
              ctx.response.status = status_1.ResponseCode.Unauthorized
              ctx.body = response_1.default.NoUser()
              return [2 /*return*/]
            }
            ;(username = user.username), (createdAt = user.createdAt)
            ctx.body = response_1.default.Success({
              data: {
                id: id,
                username: username,
                createdAt: new Date(createdAt).toLocaleDateString()
              }
            })
            return [2 /*return*/]
        }
      })
    })
  }
  UserController.prototype.uploadAvatar = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var id, buffer, newFilename, directoryPath, filePath, user
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = ctx.state.userId
            buffer = ctx.file.buffer
            newFilename = ''.concat(id, '.webp')
            directoryPath = path.resolve(__dirname, '../', 'public/avatar')
            filePath = path.join(directoryPath, newFilename)
            sharp(buffer)
              .resize(300, 300)
              .toFile(filePath, function (err) {
                if (err) {
                  console.error(err)
                }
              })
            return [4 /*yield*/, user_model_1.default.findOne({ _id: id })]
          case 1:
            user = _a.sent()
            if (!user) {
              ctx.response.status = status_1.ResponseCode.Unauthorized
              ctx.body = response_1.default.NoUser()
              return [2 /*return*/]
            }
            ctx.body = response_1.default.Success({ data: true })
            return [2 /*return*/]
        }
      })
    })
  }
  return UserController
})()
exports.default = new UserController()
