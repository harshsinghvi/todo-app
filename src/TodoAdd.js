import React, { Component } from 'react';
import './style.css'

class TodoAdd extends Component
{
    constructor(props){
        super(props);
        this.state = {todoText: ' '};

        this.handleChange = this.handleChange.bind(this);
        this.newTodo = this.newTodo.bind(this);

    }
    handleChange(event)
    {
        this.setState({todoText: event.target.value});
    }
    newTodo(event)
    {
        // this.state.name = 
        console.log(this.state.todoText);

        // alert(this.state.todoText);
        // event.preventDefault();
    }
    render()
    {
        return (
            <form onSubmit={this.newTodo}>
                <lable> 
                    Add Todo 
                    <input id="input" type="text" value={this.state.todoText} onChange={this.handleChange} />
                </lable>
                <input type="submit" value="Submit" />
            </form>
        );
    }
};

// function handle_new_todo()
// {

// }

export default TodoAdd;
