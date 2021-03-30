const { request, response } = require("express");
const express = require("express");
const path = require('path');
bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient

var DB_URI = process.env.MONGO_DB_URI
console.log(DB_URI)
const app = express();

PORT = 3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));



async function main()
{
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) ;
    await client.connect();
    const db = await client.db('todo-app');
	const todos = await db.collection('todos')

    // console.log(await todos.find().toArray());
    // todos.find().toArray()
    // .then(results => {
    // //  console.log(results)
    // });

    //CRUD 
	// api routes

	app.get('/api/todos', async (request, response) => {
		const cursor= await todos.find().toArray();
		// response.body = cursor
        response.json(cursor)
		console.log(cursor);
	});

	app.post('/api/todos', (request, response) => {
        if(!request.body["name"])
        {
            response.status(400);
            response.json({status:"Not Ok", error:"Supply name"});
            response.end();
        }
        new_todo=request.body;
        new_todo['date'] = new Date();
        new_todo["completed"] = false;

        console.log(new_todo);
		todos.insertOne(request.body)
			.then( result => {
					console.log(result)
					response.status(200)
					response.json({status:"ok", result: result})
			})
			.catch( error => {
					console.log(error)
					response.status(400)
					response.json({"status":"not ok", "error":error})
			})
	});
	app.delete('/api/todos/:id', (request, response) => {
	
	});
	app.put('/api/todos/:id', (request, response) => {
		
	});

    app.get('/', (request, response) => {
        res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
    });
    
    app.listen(PORT, function() {
        console.log('Example app listening on port 3000!');
    });

}

main();