import {combineReducers} from 'redux'

const initialState = {
    count: 0,
    total:0
}

function CounterReducer (state = initialState, action){
    switch(action.type){
        case "INCREMENT_COUNT": {
            return {count: action.count, total:state.total}
        }
        case "DECREMENT_COUNT": {
            return {count: action.count, total:state.total}
        }
        case "SET_TOTAL":{
            return {count: state.count, total:action.total}
        }
        case "SET_COUNT":{
            return {count: action.count, total:state.total}
        }
        default:
            return state
    }
} 


export default combineReducers({
    counter: CounterReducer,
    total: CounterReducer
})


