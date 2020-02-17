//const express = require("express");
//const app = express();
//const port = 3700;
//const io = require('socket.io').listen(app.listen(port));

//const express = require('express');
//const app = express();
//const port = 3700;
//const server = require('http').createServer(app);
//const io = require('socket.io')(server);

// Required Modules
const express = require('express');
const http = require('http');
const port = 3700;

//Import Module
const config = require('./util/config'); 
const webSocket = require('./util/websocket'); 
const commonFun = require('./modules/Common');
const chatService = require('./modules/ChatService');

// Create Express App
const app = express();
app.set('port', process.env.PORT || port);
new config(app, express);

//view engine setup
//app.set('view engine', "jade");
//app.engine('jade', require('jade').__express);
//app.set('views', __dirname + '/views');

//app.get("/", function(req, res){
//    res.render("chat");
//});

//app.use(express.static(__dirname + '/public'));


// Create Server
const server = require('http').createServer(app);

// Create Socket Connection
const io = require('socket.io')(server);
new chatService(new commonFun());
new webSocket(io, new commonFun(), new chatService()).SocketEvents();

//io.sockets.on('connection', function (socket) {
//    socket.emit('message', { message: 'welcome to the chat' });
//    socket.on('send', function (data) {
//        io.sockets.emit('message', data);
//    });
//});

server.listen(port);
console.log("Listening on port " + port);