import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducer'
import combineReducers from './reducer'

// const store = createStore(rootReducer)
const store = createStore(combineReducers)

export default store