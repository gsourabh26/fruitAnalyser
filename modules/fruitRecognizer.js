const ai = require("./aiAPI");

var getImageInfoFromRequest = (fileJson, isPath, callback) => {
    if (isPath) {
        if (!fileJson || Object.keys(fileJson).length == 0) {
            callback("No image data found!");
            return;
        }
        //TODO -- currently we support manipulate one photo at time.
        const fieldName = Object.keys(fileJson)[0];
        const fileInfo = fileJson[fieldName];
        const { name, path, size } = fileInfo;
        getImageInfoFromAI(path, isPath, callback);
    } else {
    	getImageInfoFromAI(fileJson, isPath, callback);
    }
}

var getImageInfoFromAI = (filepath, isPath, callback) => {
    ai.readFileAndPredictFruit(filepath, isPath, callback);
}

module.exports = {
    getImageInfoFromRequest
}