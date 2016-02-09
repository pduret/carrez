var http = require('http');
var fs = require("fs");
var outputFilename = 'leboncoin.json';
try{
var contents = fs.readFileSync("url.json");
var jsonContent = JSON.parse(contents);

}
catch (e){console.log("still not data");}

//var url = "http://www.leboncoin.fr/ventes_immobilieres/914514769.htm?ca=12_s";
//var url = "http://www.leboncoin.fr/ventes_immobilieres/915700197.htm?ca=12_s";
//var url = "http://www.leboncoin.fr/ventes_immobilieres/918949590.htm?ca=12_s";
//var url = "http://www.leboncoin.fr/ventes_immobilieres/918775386.htm?ca=12_s";
var url = jsonContent.url;
var myData = {
	title: "LeBonCoinLogement",
	type: "object",
	prix: "",
	zipcode: "",
	ville: "",
	typelog: "",
	surface: "",
	prixm2: ""
}
var myArray = ['  prix ', '  cp : ', '  city : ', '  type : ','  surface : '];
var check = false;
fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {}); 
http.get(url, function(request)
{
	var result = "";
	request.setEncoding("utf8");
	request.on("data", function(data)
	{

		if((data.indexOf(myArray[0]) != -1) && (data.indexOf(myArray[1]) != -1) && (data.indexOf(myArray[2]) != -1)
			&& (data.indexOf(myArray[3]) != -1) && (data.indexOf(myArray[4]) != -1))
		{
			var index = data.indexOf(myArray[0]);
			for(var i = 0; i<= 18; i++)
				myData.prix += data[index + i];
			myData.prix=myData.prix.substring(10,myData.prix.indexOf('"',10));

			var index = data.indexOf(myArray[1]);
			for(var i = 8; i<= 12; i++)
				myData.zipcode += data[index + i];

			var index = data.indexOf(myArray[2]);
			for(var i = 0; i<= 30; i++)
				myData.ville += data[index + i];
			myData.ville=myData.ville.substring(10,myData.ville.indexOf('"',10));
			myData.ville = myData.ville.replace(/_/g, "-");

			var index = data.indexOf(myArray[3]);
			for(var i = 10; i<= 21; i++)
				myData.typelog += data[index + i];
			myData.typelog=myData.typelog.substring(0,myData.typelog.indexOf('"',0));

			var index = data.indexOf(myArray[4]);
			for(var i = 13; i<= 16; i++)
				myData.surface += data[index + i];
			myData.surface=myData.surface.substring(0,myData.surface.indexOf('"',0));
			
			myData.prixm2 = Math.round(myData.prix / myData.surface);
			fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err)
			{
				if(err) {console.log(err);}
				else
				{
					var test2 = require('./meilleursagents.js');
					test2
				}
			});
		}
	});
});


