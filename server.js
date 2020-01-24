// mongodb://admin:heri7777@ds047968.mlab.com:47968/roses

var express = require('express');


var app = express();

const path = require('path');
const mongo = require('mongodb').MongoClient;
const BodyParser = require("body-parser");

var database, coluser;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, () => {

	const url = "mongodb://admin:heri7777@ds047968.mlab.com:47968/roses";

	mongo.connect(url, {useNewUrlParser: true}, (err, db) => {
	        if(err) {
	           console.log(err);
	           process.exit(0);
	        }

	        database = db.db('roses');
	        coluser = database.collection("user");

	});

});



console.log(path.join(__dirname,"public\\"))

app.use(express.static(path.join(__dirname,"public")));





console.log("server running");

var socket = require('socket.io');

// bagian socket

var io = socket(server);

io.on('connect', newConnection);

function newConnection(socket){
	var name = 'kampretcode';
	console.log(name, 'connect')

	socket.broadcast.emit('newuser', name);

	socket.on("disconnect", function(){
		console.log(name, 'disconnect')
	})
	
	socket.on("mouse", mouseMsg);
	function mouseMsg(data){
		socket.broadcast.emit('mouse',data);
	}


	socket.on("chat", function(data){
		console.log(data);
		socket.broadcast.emit('chat', data);
	});
}

