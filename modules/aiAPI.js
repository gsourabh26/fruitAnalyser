const Clarifai = require('clarifai');
const CONSTANTS = require('../constants.js');
const fs = require('fs');

console.log("CONSTANTS.clarifai>>.",CONSTANTS.clarifai);
const app = new Clarifai.App({
 apiKey: CONSTANTS.clarifai
});


var predictFruit = (url, cb) => {
	fs.readFile(url, (err, data) => {
	  if (err)
	  	cb(err);
	  else{
	  	app.models.predict("fruits",{base64: data.toString('base64')}).then(
			function(response){
				var fname = manipulateResponse(response);
				cb(null, fname);
		  	},
		 	function(err){	
				cb(err);
		 	}
		);
	  }
	});
	
}


var manipulateResponse = (res) =>{
	if(res && res.outputs && res.outputs.length > 0 && res.outputs[0] && res.outputs[0].data && res.outputs[0].data.concepts && res.outputs[0].data.concepts.length > 0){
		var cons = res.outputs[0].data.concepts;
		var maxProb = 0;
		var pridictedFruit = null;
		cons.forEach(function(c){
			if(c.value > maxProb){
				maxProb = c.value;
				pridictedFruit = c.name;
			}
		}) 
	}
	return pridictedFruit;
}

module.exports = {
	predictFruit
}

