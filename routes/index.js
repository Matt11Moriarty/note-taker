const express = require('express');

const htmlRouter = require('./html.js');
const apiRouter = require('./api');

const app = express();

app.use('/', htmlRouter);
app.use('/api', apiRouter);


module.exports = app;