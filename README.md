# TODO APP with React, Node, Express, mongodb and Redux

## Usage:

- Clone the Repository 

```bash
git clone https://github.com/harshsinghvi/todo-app.git
cd todo-app
```
- install Dependencies
`npm install`
- build ReactUI FrontEnd `npm run buid`
- set the **MONGO_DB_URI** environment variable so that our backend can access Database `export MONGO_DB_URI="mongodb+srv://<USER>:<PASS>@cluster0.******.mongodb.net/todo-app"` and make a database name `todo-app` and a collection in it names `todos`.
- Run the Server 
`npm start` 
> index.js serves backend and frontend together

## API 

This API communicates data in JSON format.

- `GET /` - Serves the webapp (frontend)
- `GET /api/todos` - Returns the list TODOS with their properties 
- `POST /api/todos` - Takes `"name"` in and creates new todo 
- `PUT /api/todos` - updates a specific todo distincted by `_id` property given by `GET /api/todos`
- `DELETE /api/todos` - Deletes a specific todo distincted by `_id` property given by `GET /api/todos`