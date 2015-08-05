var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = 1200;
canvas.height = 670;

var FPS = 30;

var ctx = canvas.getContext("2d");

var testChar = {
    "name" : "Gaston",
    "health" : 75,
    "hunger" : 40,
    "stress" : 60,
};

var Square = function Square(posX, posY, side, color){
    this.posX = posX;
    this.posY = posY;
    this.side = side;
    this.color = color;
    this.character = testChar;
    this.bgLayer = function(){
	ctx.fillStyle=color;
	ctx.fillRect(this.posX, this.posY, this.side, this.side);
    }
    this.space = 10;
    this.barHeight = this.side - this.space * 6;
    this.squareHeight = this.side / 2;
    this.baseLayer = function(){
	ctx.fillStyle = "#AA0000";
	ctx.fillRect(this.posX + this.space, this.posY + this.space,
		     this.squareHeight, this.squareHeight);
	ctx.fillRect(this.posX + 110, this.posY + this.space, 16,
		     this.barHeight);
	ctx.fillRect(this.posX + 136, this.posY + this.space, 16, 
		     this.barHeight);
    }
    this.healthLayer = function(){
	var healthRatio = this.character.health / 100;
	var stressRatio = this.character.stress / 100;
	var hungerRatio = this.character.hunger / 100;
	ctx.fillStyle = "#00AA00";
	ctx.fillRect(this.posX + this.space, this.posY + this.space +
		     this.squareHeight - this.squareHeight * healthRatio, 
		     this.squareHeight, this.squareHeight * healthRatio);
	ctx.fillRect(this.posX + 110, this.posY + this.space + 
		     this.barHeight - this.barHeight * stressRatio,
		     16, this.barHeight * stressRatio );
	ctx.fillRect(this.posX + 136, this.posY + this.space +
		     this.barHeight - this.barHeight * hungerRatio,
		     16, this.barHeight * hungerRatio);
    }
    this.nameLayer = function(){
	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.fillText("Gaston", this.posX + this.space * 1.7, 
		     this.posY + this.space * 6 + this.side / 2);
	ctx.fillText("S", this.posX + 110, this.posY + this.space * 6 +
		     this.side /2);
	ctx.fillText("H", this.posX + 136, this.posY + this.space * 6 +
		     this.side /2);
    }
};

var squareList = [];

var color1 = "#555555";
var color2= "#777777";
    
for (var i = 0; i < 6; i++){
    side = 165;
    colors = [color1, color2];
    var square = new Square(side * i, canvas.height - side, side, colors[i%2]);
    squareList.push(square);
}

var squareInfo = function(){    
    var info = "";
    for (var i = 0; i < squareList.length; i++){
	sq = squareList[i];
	info += "Square " + i + ": ";
	info += "posX = " + sq.posX + " - " ;
	info += "posY = " + sq.posY + " - ";
	info += "color = " + sq.color + " - ";
	info += "side = " + sq.side + "\n";
    }
    return info;
};

var squareSide = squareList[0].side;

var Rectangle = function Rectangle(posY, height, color){
    this.posX = 6 * squareSide
    this.posY = posY;
    this.width = canvas.width - 6 * squareSide;
    this.height = height;
    this.color = color;
    this.bgLayer = function(){
	ctx.fillStyle=color;
	ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
};



var rectList = [
		new Rectangle(0, squareSide, color1),
		new Rectangle(canvas.height - squareSide, squareSide, color1),
		new Rectangle(squareSide, canvas.height - 2 * squareSide, color2)
		];





var draw = function(){
    generateBG();
    for (var i = 0; i < squareList.length; i++){
	var current = squareList[i];
	//alert(squareInfo());
	squareList[i].bgLayer();
	squareList[i].baseLayer();
	squareList[i].healthLayer();
	squareList[i].nameLayer();
    }
    for (var i = 0; i < rectList.length; i++){
	//alert(squareInfo());
	rectList[i].bgLayer();
    }
};

var animateTest = function(){
    for (var i = 0; i < squareList.length; i++){
        posX = squareList[i].posX;
	posX += 1;
	if (posX >= 960) posX = 0;
	squareList[i].posX = posX;
    }
};

var update = function(){
    // animateTest();
};

var generateBG = function(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

var init = function(){
    document.body.appendChild(canvas);
    //    alert(document.body.innerHTML);
    setInterval(function(){
	    var pause = function(){};
     	    update();
	    draw();
	}, 1000/FPS);
};

window.onload = init();

