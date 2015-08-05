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
	info += "posX = " + sq.posX + "- " ;
	info += "posY = " + sq.posY + "- ";
	info += "color = " + sq.color + "- ";
	info += "side = " + sq.side + "\n";
    }
    return info;
};

console.log(squareInfo);