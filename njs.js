<<<<<<< HEAD
/**
 * Created by tobinegbert on 9/17/14.
 */
//ignore this unless something breaks then delete this -Tobin
//var express = require('express'),
//    app = express(),
//var http = require('http'),
//    io = require('socket.io'),
//    MongoClient = require('mongodb').MongoClient,
//    mongoose = require('mongoose'),
//    path = require('path');
//io.on('connection', function(socket){
//    console.log('Someone connected');
//    socket.on('disconnect', function(){
//       console.log('Someone disconnected')
//    });
//});
//
//http.listen(5678, function(){
//   console.log('Listening on port :5678'); //why did you choose this port?
//});
=======
//ignore this unless something breaks then delete this (ignore any errors in the web inspector) -Tobin
var app = require('express')(),
    http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/CSS/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/*', function(req,res){
    res.sendFile(__dirname + req.path);
});
app.get('/socket.io', function(req, res){
   res.sendFile(__dirname + '/node_modules/socket.io/index.html')
});
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

console.log(__dirname);

http.listen(5678, function(){
    console.log('listening on *:5678');
});
>>>>>>> FETCH_HEAD
