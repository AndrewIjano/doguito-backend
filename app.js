const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({ allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(bodyParser.json())

module.exports = app
