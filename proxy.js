var express = require('express');
var proxy = require('http-proxy-middleware');
 
var app = express();
debugger;
 
app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);