var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = 1200;
canvas.height = 670;

var FPS = 30;

var ctx = canvas.getContext("2d");

var Square = function Square(posX, posY, side, color){
    this.posX = posX;
    this.posY = posY;
    this.side = side;
    this.color = color;
    this.draw = function(){
	ctx.fillStyle=color;
	ctx.fillRect(this.posX, this.posY, this.side, this.side);
    }
};

var squareList = [];
    
for (var i = 0; i < 6; i++){
    side = 160;
    colors = ["#333333","#999999"];
    var square = new Square(side * i, 0, side, colors[i%2]);
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


var draw = function(){
    generateBG();
    for (var i = 0; i < squareList.length; i++){
	var current = squareList[i];
	var info = "" + current.posX + current.posY + current.color + current.side;
	//alert(squareInfo());
	squareList[i].draw();
    }
};

var update = function(){
    for (var i = 0; i < squareList.length; i++){
        posX = squareList[i].posX;
	posX += 1;
	if (posX >= 960) posX = 0;
	squareList[i].posX = posX;
    }
};

var generateBG = function(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

var init = function(){
    document.body.appendChild(canvas);
    //    alert(document.body.innerHTML);
    setInterval(function(){
     	    update();
	    draw();
	}, 1000/FPS);
};

window.onload = init();

