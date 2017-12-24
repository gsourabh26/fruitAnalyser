const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const fr = require('./modules/fruitRecognizer');


const app = express();
const PORT = 7777;



app.use(bodyParser.json({limit: '2000mb'})); 
app.use(bodyParser.urlencoded({ limit: '2000mb',extended: true })); 
app.use(multipart()); 

app.post('/info', (req, res) => {
	fr.getImageInfoFromRequest(req.files, (err, fruitName)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(fruitName);
		}
	});
})

app.all('*', (req, res) => {
	res.status(404).send("Ooopss:)");
})

app.listen(PORT, ()=>{
	console.log("server is listening on port : ",PORT);
})