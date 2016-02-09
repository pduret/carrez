var http = require('http');
var fs = require("fs");

try{
var contents = fs.readFileSync("meilleursagents.json");
var jsonContent = JSON.parse(contents);
}
catch (e){console.log("still not data");}

var entries = [{"id":1, "ville":jsonContent.ville, "zipcode":jsonContent.zipcode, "typelog":jsonContent.typelog, "surface":jsonContent.surface,
"prix1":jsonContent.prix1m2, "prix2":jsonContent.prix2m2, "deal":jsonContent.gooddeal}];
 
 
exports.getBlogEntries = function() {
    return entries;
}
 
exports.getBlogEntry = function(id) {
        if(entries[i].id == id) return entries[i];
}