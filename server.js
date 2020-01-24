// mongodb://admin:heri7777@ds047968.mlab.com:47968/roses

var express = require('express');


var app = express();

const path = require('path');
const mongo = require('mongodb').MongoClient;
const BodyParser = require("body-parser");

var database, coluser, colmessage;

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
	        colmessage = database.collection("message");

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

	coluser.updateOne({'_id': name}, {$set: { online: true}}, upsert = true)
	console.log(name, 'connect')

	socket.broadcast.emit('newuser', name);

	// getMessage
	colmessage.find({}).limit(50).toArray((error, result) => {
        if(error) {
            return false;
        }
        socket.emit('history_msg', result);
    });

    // get user
    coluser.find({}).limit(50).sort({online: 1}).toArray((error, result) => {
        if(error) {
            return false;
        }
        socket.emit('history_msg', result);
    });


	socket.on("disconnect", function(){
		console.log(name, 'disconnect')
		coluser.updateOne({'_id': name}, {$set: { online: false}}, upsert = true)
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

