import React, { Component } from 'react';
import './style.css'

const URL = "http://localhost:3000/api";

class TodoList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {data:[]};
        // updateList(this);
        this.updateList = this.updateList.bind(this);
        // this.handleChange = this.handleChange.bind(this);

        
    }

    componentDidMount(){
        this.updateList()
    }

    async updateList(){
        const response = await fetch(URL+'/todos', {
            method: 'GET'
        });
        var data = await response.json();
        console.log(data);
        this.setState({data: data});
        // fetch('URL'+"/todos")
        // .then(response =>  response.json())
        // .then(data => console.log(data)).catch(console.log("Error") );
    }
    updateTodo(){

    }
    deleteTodo(){

    }
    toggleUpdate(){

    }
    render(){
        return(
            <div>
            <h1> Todo List </h1>
            <button onClick={this.updateList} > Update </button>
            <br />
            <a>List </a>
            
            {this.state.data.map(d => (<li key={d.date}>{d.name}</li>))} 

            </div>
        );
    }

};

export default TodoList