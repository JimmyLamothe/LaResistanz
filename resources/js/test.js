var fs = require("fs");

var readFileSync = function(path){
    return fs.readFileSync(path).toString();
};

var sourceJSON = readFileSync('../json/namelists.json');

var parsedJSON = JSON.parse(sourceJSON);

console.log(parsedJSON);