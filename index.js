
global.__dirEntry = __dirname;
global.fs = require('fs');
global.path = require('path');
global.moment = require('moment');
moment.locale("ru");
global.ytdl = require('ytdl-core');
global.assert = require('assert');
global.request = require('request');
global.util = require('util');
global.mkdirp = require('mkdirp');
global.cheerio = require('cheerio');



global.g = {
    port: 7777,//port,
    wsport: 8080,//wsport,
    domain: 'http://127.0.0.1'//127.0.0.1'//'http://warp.pp.ua'//domain
};



const express = require('express');
const http = require('http');
const favicon = require('serve-favicon');
const consoleLog = require('./morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');

var app = express();

var errors = require('./middleware/errors');

app.set('views', path.join(__dirname, 'views', 'ejs'));
app.set('view engine', 'ejs');

//app.disable('x-powered-by');

app.use(compression());

app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(consoleLog('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/regex', require('./routes/regex'));
app.use('/rus', require('./routes/rus'));
app.use('/test', require('./routes/test'));//кнопки
app.use('/bugaltery', require('./routes/bugaltery'));
app.use('/nova_poshta', require('./routes/novaposhta'));
app.use('/ws', require('./routes/ws'));
app.use('/scan', require('./routes/scan'));

app.use(errors.notfound);
app.use(errors.serverError);

var server = http.createServer(app);

server.listen(g.port, function() {
    console.log(g.domain + ':' + g.port);
});


