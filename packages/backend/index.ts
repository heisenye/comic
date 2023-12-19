import dotenv = require('dotenv')
dotenv.config()
import run from './app/app'
import connect from './app/mongoose'


connect()
run(888)