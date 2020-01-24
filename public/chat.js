var bodychat = document.getElementById('bodychat');
var send = document.getElementById('send');
var chatmsg = document.getElementById('chatmsg');

send.onclick = function(){
	var payload = {
		name: '',
		msg: chatmsg.value
	};

	socket.emit('chat', payload);
}

socket.on('chat', function(data){
	tdata = '[ '+ data.name  +' ]' + data.msg;	
	bodychat.append(tdata)
});

console.log(bodychat);