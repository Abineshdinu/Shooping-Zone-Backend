const express = require('express');
const app = require('./app'); 
const db = require('./db/db')
db();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port port: ${process.env.PORT} in  ${process.env.NODE_ENV}`);
});
