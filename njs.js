var express = require('express'),
    app = express(),
    http = require('http'),
    io = require('socket.io'),
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

app.listen(5678, function(){
    console.log('Listening on port :5678')
});
