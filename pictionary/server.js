var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


io.on('connection', function(socket) {
    socket.on('connect', function(){
        console.log('A user has connected');   
    });
    
    socket.on('drawing', function(drawing) {
        socket.broadcast.emit('drawing', drawing);
    })

    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess)
    })

});

 io.on('disconnect', function (socket) {
     socket.on('disconnect', function() {
         console.log('A user has disconnected');
     });
 });

server.listen(process.env.PORT || 8080);