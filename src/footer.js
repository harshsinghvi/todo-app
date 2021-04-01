import React, { Component } from 'react';
import './style.css'
import store from './redux/store'
import { connect } from "react-redux";
import {incrementCount, decrementCount } from './redux/actions'

class Footer extends Component
{
    state = this.getCurrentStateFromStore()

    getCurrentStateFromStore() {
        return {
          count: store.getState().counter.count,
          total: store.getState().counter.total
        }
      }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();

        if (this.state !== currentState) {
            this.setState(currentState);
        }
    }
    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    
    
    render (){
        console.log("Footer Props " + this.props.total + " "+ this.props.count)
        var {count, total} = this.props;
        return (
            <div>
            Completed: {count} Tasks out of {total} Tasks.
            </div>
        )
    }
}
  
const mapStateToProps = (state) => {
    return {
      count: state.counter.count,
      total: state.counter.total
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return {
      onIncrementClick: (count) => {  
        dispatch(incrementCount(count))
      },
      onDecrementClick: (count) => {
        if(count !== 0) 
        dispatch(decrementCount(count))
      }
    }
  }


export default  connect(mapStateToProps, mapDispatchToProps)(Footer)