const { request, response } = require("express");
const express = require("express");
const path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();

//var mongoose   = require('mongoose');

//var DB_URI = precess.env.MONGO_DB_URI
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
// mongoose.connect(DB_URI)

PORT = 3000;

const app = express();
bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));
app.get('/', (request, response) => {
		res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  	});

app.get('/hello-world', (request, response) => {

// response.sendStatus("200");

response.send("Hello World!!");

});

app.get('/exit' , (request, response) => {
	process.exit();
});

app.get("/test", (request, response) => {
	if(eventEmitter.emit("testem"))
	{
		response.send("good event ...");
	}
	else
	{
		response.send("not good event ...");
	}
});

app.listen(PORT, function() {
	console.log('Example app listening on port 3000!');
});

//console.log(process.env.USER);

process.on('exit', function () {
	console.log("exitting ..... ")
});


// eventEmitter.on('testem', () => console.log("Event test"));