import logo from './logo.svg';
import './App.css';
import TodoAdd from './TodoAdd.js';
import TodoList from './TodoList';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './footer'
// const store = createStore(store)

function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <h1> Todo App</h1>
      <TodoAdd />
      <TodoList />
      <Footer />
    </div>
    </Provider>

  )
}

export default App;
