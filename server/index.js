// DEPENDENCIES
const express = require('express')
// MIDDLEWARES
const { default: applyMiddlewaresTo } = require('./middlewares')
// CONTROLLERS
const addAllEndpointsTo = require('./endpoints')
// DATABASE
const connectDbTo = require('./database')
// ENV
require('dotenv').config()

const { SERVER_PORT } = process.env

// APP
const app = express()

// EXPRESS STATIC
app.use(express.static(__dirname + '/../build'))

// MIDDLEWARES
applyMiddlewaresTo(app)

// DB
connectDbTo(app)

// ENDPOINTS
addAllEndpointsTo(app)

// LISTEN
app.listen(
  SERVER_PORT,
  console.log(`Freezing Icelandic Fingers on port ${SERVER_PORT}`)
)
