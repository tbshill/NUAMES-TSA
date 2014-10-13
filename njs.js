//var express = require('express'),
//    app = express(),
//    io = require('socket.io')(http),
//    htmlRoot = '/Users/tobinegbert/WebstormProjects/notes-app/',
//    path = require('path'),
//    app2 = express.createServer();
//    socket = socket.listen(app2);

var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var i = 0;

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});
io.on('connection', function(socket){
    i++;
    console.log('Number of users online is: ' + i);
    socket.on('disconnect', function(){
        i--;
        console.log('Number of users online is: ' + i);
        if(i == 0){
            console.log('No one is online')
        }
    })
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/CSS/*', function(req, res){
    res.sendFile(__dirname + req.path);
});
app.get('/*', function(req,res){
    res.sendFile(__dirname + req.path);
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
app.get('/Chat/*', function(req, res){
   res.sendFile(__dirname + req.path);
});

//socket.io.on('connection', function(client){
//    console.log("Someone connected");
//    socket.on('disconnect', function(){
//        console.log("Someone disconnected")
//    });
//});

http.listen(5678, function(){
    console.log('listening on *:3000');
});
