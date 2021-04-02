import React, { Component } from 'react';
import './style.css'
import {incrementCount, decrementCount, setTotal,setCount} from './redux/actions'
import {connect} from 'react-redux'
import TodoAdd from './TodoAdd'

// const URL = process.env.URL+":"+process.env.PORT+"/api/todos" || "http://localhost:3000/api/todos";
const URL = window.location.href+'api/todos' || "http://localhost:3000/api/todos";
class TodoApp extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {data:[], count: 0, total:0};
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount(){
        this.updateList()
    }

    // Update Todo Lists
    async updateList(){
        const response = await fetch(URL, {
            method: 'GET'
        });
        var data = await response.json();
        console.log(data);
        var count = 0;

        for(var index =0; index<data.length;index++)
        {
            if( data[index].completed == true)
            {
                count = count +1;
            }
        }
        this.setState({data: data,count:count, total: data.length});
        this.props.onSetTotal(this.state.total)
        this.props.onSetCount(this.state.count)
    }

    deleteTodo(_id){
        console.log(_id);
        fetch(URL,{
            method:"DELETE", 
            body:JSON.stringify({
                "_id": _id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then( response => {console.log(response); this.updateList() } ).catch(error => {console.log(error)});

    }
    // Update Checklist complete status
    handleUpdateChecks(_id){
        var i = this.state.data.findIndex(t => t["_id"] == _id)

        var temp = this.state.data;
        var count = this.state.count;

        if(this.state.data[i].completed)
        {
            this.props.onDecrement(this.state.count)
            this.setState({ count: --count });
        }
        else{
            this.props.onIncrement(this.state.count)
            this.setState({ count: ++count });
        }

        temp[i]['completed'] = ! this.state.data[i]['completed']
        this.setState({data:temp });

        fetch(URL,{
            method:"PUT", 
            body:JSON.stringify(temp[i]),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then( response => {console.log(response); this.updateList(); } )
        .catch(error => {console.log(error)});
    }
    
    render(){
        return(
            <div>
            <TodoAdd update={this.updateList} /> 
            <br />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <center><table className="table fixed round">
        
            {this.state.data.map(d => (
            <tr key={d.date}>  
                <col width="10px" />
                <col width="150px" />
                <col width="10px" />
                <td><input id={d._id} type="checkbox" checked={d.completed} onChange={() => { this.handleUpdateChecks(d._id)}}/> </td> 
                <td> {d.name} </td> 
                <td> <a onClick={() => {this.deleteTodo(d._id)}} ><i class="fa fa-trash" aria-hidden="true"></i></a></td>
            </tr>))} 

            </table></center>
            </div>
        );
    }

};

// Maping Redux states and action functions

const mapStateToProps = (state) => {
    return {
      count: state.counter.count,
      total: state.counter.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onIncrement: (count) => { dispatch(incrementCount(count)) },
      onDecrement: (count) => { if(count !== 0) dispatch(decrementCount(count)) },
      onSetTotal:(total)   => { dispatch(setTotal(total)) },
      onSetCount:(count)   => { dispatch(setCount(count)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)