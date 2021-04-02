import React, { Component } from 'react';
import './style.css'

const URL = "http://localhost:80/api/todos";
// const URL = process.env.URL + '/api/todos'

class TodoAdd extends Component
{
    constructor(props){
        super(props);
        this.state = {todoText: ''};

        this.handleChange = this.handleChange.bind(this);
        this.newTodo = this.newTodo.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);

    }
    handleChange(event)
    {
        this.setState({todoText: event.target.value});
    }
    async newTodo(event)
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
            })
            .then( response => { console.log(response); this.setState({ todoText: ''}); })
            .catch(error => { console.log(error); this.setState({ todoText: ''})});
            this.props.update();
        }
    }
    _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.newTodo()
        }
      }
    render()
    {
        return (
            <div>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            {/* <form action="{this.newTodo}"> */}
                <lable> 
                    <input id="input" type="text" onKeyDown={this._handleKeyDown} value={this.state.todoText} onChange={this.handleChange} />
                </lable>
                <button type="submit" value="Add New Task" onClick= {this.newTodo} > <i class="fa fa-plus" /> Add New Task </button>
            {/* </form> */}
            </div>
        );
    }
};

// function handle_new_todo()
// {

// }

export default TodoAdd;
