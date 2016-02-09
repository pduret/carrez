var http = require('http');
var fs = require("fs");

try{
var contents = fs.readFileSync("leboncoin.json");
var jsonContent = JSON.parse(contents);
}
catch (e){console.log("still not data");}

var url = "http://www.meilleursagents.com/prix-immobilier/" + jsonContent.ville + "-" + jsonContent.zipcode +"/#estimates";
var myData = {
	title: "MeilleursAgentsLogement",
	type: "object",
	zipcode: jsonContent.zipcode,
	ville: jsonContent.ville,
	typelog: jsonContent.typelog,
	surface: jsonContent.surface,
	prix1m2: jsonContent.prixm2,
	prix2m2: "",
	gooddeal: ""}
var outputFilename = 'meilleursagents.json';
var myArray = ['Prix m2 ' + jsonContent.typelog + ' :'];
//var check = false;
fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {}); 

http.get(url, function(request)
{
	var result = "";
	request.setEncoding("utf8");
	request.on("data", function(data)
	{
			if((data.indexOf(myArray[0]) != -1))
			{
				var index = data.indexOf(myArray[0]);
				if(myData.typelog == "appartement")
				{
					for(var i = 22; i<= 25; i++)
						myData.prix2m2 += data[index + i];
				}
				else
				{
					for(var i = 17; i<= 20; i++)
						myData.prix2m2 += data[index + i];
				}
				if(myData.prix2m2 >= jsonContent.prix2m2)
					myData.gooddeal = true;
				else
					myData.gooddeal = false;
				
				fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err)
				{
					if(err) {console.log(err);}
				else
				{
					return true;
				}
				}); 
			}
	});
});