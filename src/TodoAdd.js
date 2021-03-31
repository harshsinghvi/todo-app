import React, { Component } from 'react';
import './style.css'

// const URL = "http://localhost:3000/api/todos";
const URL = process.env.URL
class TodoAdd extends Component
{
    constructor(props){
        super(props);
        this.state = {todoText: ''};

        this.handleChange = this.handleChange.bind(this);
        this.newTodo = this.newTodo.bind(this);

    }
    handleChange(event)
    {
        this.setState({todoText: event.target.value});
    }
    async newTodo()
    {
        if(this.state.todoText == '' )
        {
            alert("Enter Todo Text");
        }
        else{
            console.log(this.state.todoText);
            await fetch(URL,{
                method:"POST", 
                body:JSON.stringify({
                    "name": this.state.todoText
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then( response => {console.log(response)} ).catch(error => {console.log(error)});
        
        }
        // alert(this.state.todoText);
        // event.preventDefault();
    }

    render()
    {
        return (
            <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <form>
                <lable> 
                    <input id="input" type="text" value={this.state.todoText} onChange={this.handleChange} />
                </lable>
                <button type="submit" value="Add New Task" onClick= {this.newTodo} > <i class="fa fa-plus" /> Add New Task </button>
            </form>
            </div>
        );
    }
};

// function handle_new_todo()
// {

// }

export default TodoAdd;
