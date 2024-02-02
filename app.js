// app.js
const express = require('express');
const app = express();
const errormiddleware = require('./Middlewares/error');
// const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
const products = require('./routes/product')
const auth = require('./routes/auth')
app.use('/api',products,auth)


app.use(errormiddleware)

module.exports = app;

