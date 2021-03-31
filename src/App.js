import logo from './logo.svg';
import './App.css';
import TodoAdd from './TodoAdd.js';
import TodoList from './TodoList';

var events = require('events');
var eventEmitter = new events.EventEmitter();

function App() {
  return (
    <div className="App">
      <h1> Todo-App</h1>
      <TodoAdd />
      <TodoList />
    </div>
  )
}
function handle_update()
{
  eventEmitter.emit("update");
}
eventEmitter.on('update',  () => {
  window.alert("hello")
});

export default App;
