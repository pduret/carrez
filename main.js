var test = require('./leboncoin.js');
test

var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static('public')); 

var hbs = require('hbs');

function function2(){
var blogEngine = require('./blog');
 
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
app.get('/', function(req, res) {
    res.render('index',{title:"My Housing App", entries:blogEngine.getBlogEntries()}); });
	
	console.log("Server is listening on port 3000");
}
setTimeout(function2, 2000);
app.listen(3000);
