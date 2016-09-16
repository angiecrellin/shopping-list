var express = require('express');


var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var connectedCount = 0;
var clients = [];
var privateMessage = false

    
    
    

    io.on('connection', function(socket) {
        console.log('Client connected');
        connectedCount += 1;
        io.sockets.emit('connectedCount', connectedCount);
        socket.on('message', function(message) {
            console.log('Received message:', message);
            socket.broadcast.emit('message', message);
        });


        // Add '{user} is typing' functionality
        var typingMessage = false

        socket.on('typingMessage', function(typingMessage) {
            socket.broadcast.emit('typingMessage', typingMessage)
        });

        // Add private messaging by sending events to specific sockets using ID already assigned
        
        socket.on('connection',function(){
            io.sockets.connected(clients)
            socket.emit(clients)
            console.log('users online:', clients)
            
        });
        
        
    
        
        
        socket.on('privateMessage#' + socket.id, function(message) {
            console.log('privateMessage#', socket.id, message)
            socket.broadcast.emit('privateMessage#' + socket.id, message);
        });


        setTimeout(function(){
            console.log(socket.id)
            socket.emit('privateMessage' + socket.id, 'user2 says hello')
        }, 5000)


        socket.on('disconnect', function() {
            connectedCount -= 1;
            io.sockets.emit('connectedCount', connectedCount);
            console.log('disconnected');
        });
    });

server.listen(process.env.PORT || 8080);
console.log('server is running');