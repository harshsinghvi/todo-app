import logo from './logo.svg';
import './App.css';
import TodoAdd from './TodoAdd.js';
import TodoList from './TodoList';

var events = require('events');
var eventEmitter = new events.EventEmitter();

function App() {
  return (
    <div className="App">
      <h1> Todo App</h1>
      <TodoAdd />
      <TodoList />
    </div>
  )
}

export default App;
