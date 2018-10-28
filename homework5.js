

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const colorArray = ['Indigo', 'blue', 'CadetBlue', 'pink', 'black']
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

let Arr = [];


const createBoxes = function (count, canvasWidth, canvasHeight) {
  	
 	
    for (let i = 0; i < count; i++) {
	const rectObj = {
	x: rand(canvas.width-50),
	y: rand(canvas.height-50),
	width: 50,
	height: 50,
	xDelta: 2,
	yDelta: 2, 
	color: colorArray[rand(5) - 1],
	draw : function () {
	 context.fillStyle = this.color;
	 context.fillRect(this.x, this.y, this.width, this.height); 
	},
	update : function() {
		if (this.x + this.width >= canvas.width) {
		this.xDelta = this.xDelta * -1
	}
		if(this.y + this.height >= canvas.height) {
			this.yDelta = this.yDelta * -1;
		}
		if(this.x <= 0) {
			this.xDelta = this.xDelta * -1;
		}
		if(this.y <=0) {
			this.yDelta = this.yDelta * -1;
		}
	 this.x += this.xDelta;
	 this.y += this.yDelta;
	}
	

}
	Arr[Arr.length] = rectObj;
}
return Arr;

 };


let boxes = createBoxes(30, canvas.width, canvas.height);


let draw = function(){

	context.fillStyle = 'AntiqueWhite'; 
	context.fillRect(0,0, canvas.width, canvas.height);	
	boxes.forEach(function(index){
		index.draw();
	});
	 
}
let update = function(){

	boxes.forEach(function(index){
		index.update();
	})
}

 const loop = function() {
 	draw();
 	update();
		
		requestAnimationFrame(loop);
	};
 	loop()

//2 	

