// app.js
const express = require('express');
const app = express();
const errormiddleware = require ('./Middlewares/error')

app.use(express.json());
const products = require('./routes/product')
app.use('/api',products)

app.use(errormiddleware)

module.exports = app;
