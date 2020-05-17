/**
 * Module dependencies.
 */

let config = require('config');
global.config = config;
process.env.NODE_CONFIG_DIR = 'config/';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

let app = express();
global.app = app;
let RateLimit = require('express-rate-limit');

let apiLimiter = new RateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10000000,
    delayMs: 0 // disabled
});
app.use(apiLimiter);
app.set('port', process.env.PORT || config.get('PORT'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.raw({ type: 'text/xml', charkey: 'value',normalize: true,normalizeTags: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,version');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
let modules = require('./modules');

let http = require('http');
let startServer = http.createServer(app).listen(app.get('port'), function () {
    console.log("into start server")
});


app.use(function (err, req, res, next) {
    if (err.isBoom) {
        var customErrorMessage = err.data[0].message;
        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        return res.status(response.status).send(response);
    }
});
