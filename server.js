const { request, response } = require("express");
const express = require("express");
const path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const MongoClient = require('mongodb').MongoClient

var DB_URI = process.env.MONGO_DB_URI
console.log(DB_URI)
const app = express();
bodyParser = require("body-parser");

PORT = 3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));


MongoClient.connect(DB_URI, (err, client) => {
	if (err) return console.error(err)
  	console.log('Connected to Database !!')
	const db = client.db('todo-app')
	const todos = db.collection('todos')

		//CRUD 
	// api routes

	app.get('/api/todos', (request, response) => {
		const cursor=todos.find()
		// request.body= cursor
		//console.log(cursor)
	})

	app.post('/api/todos', (request, response) => {
		todos.insertOne(request.body)
			.then( result => {
					console.log(result)
					response.status(200)
					response.body({"status":"ok", "result":result})
			})
			.catch( error => {
					console.log(error)
					response.status(400)
					response.body({"status":"not ok", "error":error})
			})
	})
	app.delete('/api/todos/:id', (request, response) => {
	
	})
	app.put('/api/todos/:id', (request, response) => {
		
	})
})

// client.connect().then(  db = client.db('todo-app') );


// const todo_schema = new mongoose.Schema({
// 	text: String,
// 	data: Date,
// 	completed: Boolean, 
//   });
// const todo = mongoose.model('todo', todo_schema);






// var todos=[];
// sample_todo = {
// 	"date":"2021-03-29", //yy-mm-dd
// 	"text":"First Todo", //text
// 	"completed": true    //bool

// }

//sample toute
//app.get('/api/todos', (request, response) => { });


app.get('/', (request, response) => {
	res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.get('/hello-world', (request, response) => {
	response.send("Hello World!!");
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


eventEmitter.on('testem', () => console.log("Event test"));

eventEmitter.on('', () => {

});




// MongoClient.connect(DB_URI, function(err, client) {
// 	var db = client.db("todo-app")
//     var cursor = db.collection('todos').find();

//     cursor.each(function(err, doc) {

//         console.log(doc);

//     });
// }); 

