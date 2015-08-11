// Create canvas element.
var canvas = document.createElement("canvas");
canvas.id = "game_canvas";
canvas.width = 1200;
canvas.height = 670;

// Define frames per second.
var FPS = 30;
var timer = 0;

// Get canvas context.
var ctx = canvas.getContext("2d");

// Define test character.
var Char = function Char(){
    this.name = "Gaston";
    this.health = 75;
    this.hunger = 30;
    this.stress = 66;
};

// Square object constructor for bottom characters with health bars.
var Square = function Square(posX, posY, side, color){
    this.posX = posX;
    this.posY = posY;
    this.side = side;
    this.height = side;
    this.width = side;
    this.color = color;
    this.character = new Char();
    this.space = 10;
    // Draw background for character square.
    this.bgLayerDraw = function(){
		ctx.fillStyle=this.color;
		ctx.fillRect(this.posX, this.posY, this.side, this.side);
    }
    // Base Layer info.
    this.baseLayer = {};

    // Icon info.
    this.baseLayer.icon = {};
    this.baseLayer.icon.name = "icon";
    this.baseLayer.icon.height = this.side / 2;
    this.baseLayer.icon.width = this.side / 2;
    this.baseLayer.icon.posX = this.posX + this.space;
    this.baseLayer.icon.posY = this.posY + this.space;

    // Health Bar info.
    this.baseLayer.hungerBar = {};
    this.baseLayer.hungerBar.name = "hunger";
    this.baseLayer.hungerBar.height = this.side - this.space * 6;
    this.baseLayer.hungerBar.width = 16;
    this.baseLayer.hungerBar.posX = this.posX + 136;
    this.baseLayer.hungerBar.posY = this.posY + this.space;

    // Stress Bar info.
    this.baseLayer.stressBar = {};
    this.baseLayer.stressBar.name = "stress";
    this.baseLayer.stressBar.height = this.side - this.space * 6;
    this.baseLayer.stressBar.width = 16;
    this.baseLayer.stressBar.posX = this.posX + 110;
    this.baseLayer.stressBar.posY = this.posY + this.space;

    // Draw red square icon + red health bars for character square.
    this.baseLayerDraw = function(){
	    var iconHeight = this.baseLayer.icon.height;
		ctx.fillStyle = "#AA0000";
		ctx.fillRect(this.baseLayer.icon.posX, this.baseLayer.icon.posY,
			     iconHeight, iconHeight);
		ctx.fillRect(this.baseLayer.hungerBar.posX, this.baseLayer.hungerBar.posY,
					 this.baseLayer.hungerBar.width, this.baseLayer.hungerBar.height);
		ctx.fillRect(this.baseLayer.stressBar.posX, this.baseLayer.stressBar.posY,
					 this.baseLayer.stressBar.width, this.baseLayer.stressBar.height);
    }

    // Draw current health, hunger and stress levels in green.
    this.healthLayer = function(){
    	var iconHeight = this.baseLayer.icon.height;
    	var barHeight = this.baseLayer.stressBar.height;
		var healthRatio = this.character.health / 100;
		var stressRatio = this.character.stress / 100;
		var hungerRatio = this.character.hunger / 100;
		ctx.fillStyle = "#00AA00";
		ctx.fillRect(this.baseLayer.icon.posX, this.baseLayer.icon.posY +
			     iconHeight - iconHeight * healthRatio, 
			     iconHeight, iconHeight * healthRatio);
		ctx.fillRect(this.baseLayer.hungerBar.posX, this.baseLayer.hungerBar.posY + 
			     barHeight - barHeight * hungerRatio,
			     16, barHeight * hungerRatio );
		ctx.fillRect(this.baseLayer.stressBar.posX, this.baseLayer.stressBar.posY +
			     barHeight - barHeight * stressRatio,
			     16, barHeight * stressRatio);
    }
    // Draw character name and health bar IDs.
    this.nameLayer = function(){
		ctx.fillStyle = "#000000";
		ctx.font = "20px Arial";
		ctx.fillText(this.character.name, this.posX + this.space * 1.7, 
			     this.posY + this.space * 6 + this.side / 2);
		ctx.fillText("S", this.posX + 110, this.posY + this.space * 6 +
			     this.side /2);
		ctx.fillText("H", this.posX + 136, this.posY + this.space * 6 +
			     this.side /2);
    }
    // Action to take on click.
    this.click = function(){
    	var testList = [this.baseLayer.icon, this.baseLayer.stressBar,
    					this.baseLayer.hungerBar];
    	var current = this;
    	testList.forEach(function(elem){
    		if (clickCheck(lastClick[1],lastClick[2],elem)){
    			// alert(elem.name);
    			if (elem.name == 'stress'){
    				timer = 1000;
    				var refLevel = current.baseLayer.stressBar.height;
    				var stressPer = (lastClick[2] - 
    								 current.baseLayer.stressBar.posY) / refLevel;
    				var newStress = 100 - 100 * stressPer;
    				current.character.stress = newStress;
    			}
    			if (elem.name == 'hunger'){
    				timer = 1000;
    				var refLevel = current.baseLayer.hungerBar.height;
    				var hungerPer = (lastClick[2] - 
    								 current.baseLayer.hungerBar.posY) / refLevel;
    				var newHunger = 100 - 100 * hungerPer;
    				current.character.hunger = newHunger;
    			}
    		}
    	})
    }
};

// Creation of array holding all character square objects.
var squareList = [];

var color1 = "#555555";
var color2= "#777777";
    
for (var i = 0; i < 6; i++){
    side = 165;
    colors = [color1, color2];
    var square = new Square(side * i, canvas.height - side, side, colors[i%2]);
    squareList.push(square);
    squareList[i].name = "charSquare" + i;
}

// Debugging function to display current char square info.
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

// Get square side to place info rectangles on right side of screen.
var squareSide = squareList[0].side;

// Constructor for info rectangles.
var Rectangle = function Rectangle(posY, height, color, name){
	this.name = name;
    this.posX = 6 * squareSide
    this.posY = posY;
    this.width = canvas.width - 6 * squareSide;
    this.height = height;
    this.color = color;
    this.bgLayerDraw = function(){
		ctx.fillStyle=color;
		ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
    this.nameLayerDraw = function(){
    	ctx.fillStyle = "#000000";
    	ctx.font = "20px Arial";
    	ctx.fillText(this.name, this.posX + this.width / 2 -
    				 this.name.length * 4.5, this.posY +25);
    }
};

// Generate rectangle list.
var rectList = [
		new Rectangle(0, squareSide, color1, "specInfo"),
		new Rectangle(canvas.height - squareSide, squareSide, color1,"genInfo"),
		new Rectangle(squareSide, canvas.height - 2 * squareSide, color2,"specAction")
		];

// Define basic Map object.
var mapSquare = {
	posX : 0,
	posY : 0,
	width : canvas.width - rectList[0].width,
	height : canvas.height - squareList[0].height,
	fontSize : 100,
	imageSrc : "../images/village_aerial.jpg",
	name : "map",
	map: "HOME",
	draw : function(){
		ctx.fillStyle = "#BBBBBB";
		ctx.font = this.fontSize + "px Arial";
		ctx.fillText(this.map, this.width /2 - this.fontSize * this.map.length / 2.8,
		 			 this.height /2 + this.fontSize / 5);
	}
};


// Draw function to draw all objects on canvas.
var draw = function(){
    generateBG();
    mapSquare.draw();
    for (var i = 0; i < squareList.length; i++){
	var current = squareList[i];
	// Only draw if character present in charSquare.
	if (current.character){
		current.bgLayerDraw();
		current.baseLayerDraw();
		current.healthLayer();
		current.nameLayer();
    	}
	}
    for (var i = 0; i < rectList.length; i++){
	//alert(squareInfo()); // Uncomment to debug.
		var current = rectList[i];
		current.bgLayerDraw();
		current.nameLayerDraw();
    }
};



// Update function to give all objects correct info. To be defined.
var update = function(){
	//if (timer == 0) alert('check'); // Uncomment to debug.
	if (lastClick[0].slice(0,4) ==  'char') {
		activeSquare = lastClick[0].slice(10,11);
		squareList[activeSquare].click();
	}
};

// Draw black BG on whole canvas.
var generateBG = function(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Init function called after window load. Calls setInterval game loop.
var init = function(){
	// Add canvas to DOM as first child to body.
    document.body.appendChild(canvas);
    //    alert(document.body.innerHTML); // Uncomment to debug HTML.
    setInterval(function(){
     	if (timer == 0) {
     		update();
     	}
	    draw();
	    timer += 1;
	}, 1000/FPS);
};

// Define element array to hold all screen elements.
var elements = [];

// Add all rectangles + squares + map to elements array.
squareList.forEach(function(square){
	elements.push(square);
})

rectList.forEach(function(rect){
	elements.push(rect);
})

elements.push(mapSquare);

// Debug function to list elements array contents. Uncomment alert to test.
elements.forEach(function(element){
	info = "";
	if (element.fontSize){
		info += "map";
	}
	else if (element.side){
		info += "square";
	} else {
		info += "rectangle";
	}
	info += " posX = " + element.posX;
	info += " posY = " + element.posY;
	info += " width = " + element.width;
	info += " height = " + element.height;
	// alert(info);
})

var lastClick = ['null',0,0];

// Event Listener for mouse clicks.
canvas.addEventListener('click', function(event){
	var x = event.pageX - 8;
	var y = event.pageY - 8;
	// Determine which element was clicked.
	elements.forEach(function(elem){
		if (clickCheck(x, y, elem)) {
			lastClickRel = [elem.name, x - elem.posX, y - elem.posY];
			lastClick = [elem.name, x, y];
		}
	})
	// alert(lastClick);
	timer = 0;
})

// General function to see if click inside limits. Parameter 'elem' must have
// posX, poxY, height and width parameters. 
var clickCheck = function(x, y, elem){
	if (y > elem.posY && y < elem.posY + elem.height &&
			x > elem.posX && x < elem.posX + elem.width){
		return true;
	}
};

window.onload = init();

