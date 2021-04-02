import './App.css';

import TodoApp from './TodoApp';
import { Provider } from 'react-redux' //Redux Provider
import store from './redux/store' //Redux Store
import Footer from './footer'

function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <h1> Todo App</h1>
      <TodoApp />
      <Footer />
    </div>
    </Provider>

  )
}

export default App;
