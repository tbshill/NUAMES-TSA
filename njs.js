var express = express(),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    mongoose = require('mongoose'),
    Cookies = require( "cookies"),
    path = require('path');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/CSS/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/*', function(req,res){
    res.sendFile(__dirname + req.path);
});
//app.get('/socket.io', function(req, res){
//   res.sendFile(__dirname + '/node_modules/socket.io/index.html')
//});
app.get('/OurChapter/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/OurSchool/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/DesignBrief/*', function(req,res){
    res.sendFile(__dirname + req.path);
});
app.get('/Home/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/Login/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/Sponsers/*', function(req,res){
    res.sendFile(__dirname + req.path);
});

io.on('connection', function(socket){
    console.log('Hi');
});

app.listen(5678, function(){
    console.log('Listening on port :5678')
});
