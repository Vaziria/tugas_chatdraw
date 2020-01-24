function setup() {
	createCanvas(500, 500);
	background(51);
	
	socket.on('mouse',newDrawing);
}

function newDrawing(data){
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x,data.y,10,10);
}

function mouseDragged(){
	console.log(mouseX + ' + ' + mouseY);
	noStroke();
	fill(255);
	
	ellipse(mouseX,mouseY,10, 10);
	
	data = {
		x: mouseX,
		y: mouseY
	}
	
	socket.emit('mouse', data);
	
}

function draw() {
	
}