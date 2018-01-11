// Import dependecies
require('dotenv').config();
const constants = require('./constants');
const express = require('express');
const apiai = require('apiai');
const bodyParser = require('body-parser');
const app = express();
const chat = apiai(constants.CLIENT_ACCESS_TOKEN);


// Middleware set-up
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Import route file
const index = require('./routes/index.js'); //Route File

app.use('/', index); //attatch index routes with base uri '/'


// Server setup and start
const port = process.env.PORT || 3000;

app.listen(port);
console.log('Bot Is Running on localhost:' + port);
