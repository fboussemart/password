const express = require("express");
const router = require('./router');
const bodyParser = require("body-parser");

const cors = require('cors');
const app = express();

const port = 8081;

app
    .use(cors())
    .use(express.static('resources'))
    .use(bodyParser.json()) // for parsing application/json
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(router)
    .listen(port, () => console.log('Example app listening on port ' + port));