const express = require("express");
const router = require('./router');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
//const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const port = process.env.PORT || 8000;

if (app.get('env') === 'development') {
    console.log('--- mode : development ---');
}

app
//    .use(favicon(path.join(__dirname, 'public', 'ua.jpg')))
    .use(cors())
    .use(morgan('combined'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(router)
    .listen(port, () => console.log('Example app listening on port ' + port));