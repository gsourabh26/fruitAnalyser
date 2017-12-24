const ai = require("./aiAPI");

var getImageInfoFromRequest = (fileJson, callback)=>{
	if(!fileJson || Object.keys(fileJson).length == 0){
		callback("No image data found!");
	}
	//TODO -- currently we support manipulate one photo at time.
	const fieldName = Object.keys(fileJson)[0];
	const fileInfo = fileJson[fieldName];
	const {name, path, size} = fileInfo;
	getImageInfoFromAI(path, callback);
}

var getImageInfoFromAI = (filepath, callback) => {
	ai.predictFruit(filepath, callback);
}

module.exports = {
	getImageInfoFromRequest
}
