

var express = require('express');


var app = express();
var server = app.listen(3000);
const path = require('path');

console.log(path.join(__dirname,""))

app.use(express.static(path.join(__dirname,"public")));


console.log("server running");

var socket = require('socket.io');

var io = socket(server);

io.on('connection', newConnection);

function newConnection(socket){
	console.log('new Connection : ' + socket.id);
	
	socket.on("mouse",mouseMsg);
	function mouseMsg(data){
		socket.broadcast.emit('mouse',data);
	}	
}

