var express = require('express');
var engines = require('consolidate');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var http = require('http');
var https = require('https');

var app = express();

var options = {
  key: fs.readFileSync('private.pem'),
  cert: fs.readFileSync('public.pem')
};



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view 경로 설정
app.set('views', __dirname + '/views');

// 화면 engine을 html로 설정
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(__dirname + '/views'));
app.get('/', function(req, res, next) {
  res.render('index.html');
});

http.createServer(app).listen(8888);
https.createServer(options, app).listen(4433);

