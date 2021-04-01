import { ObjectID } from 'bson';
import React, { Component } from 'react';
import './style.css'
import {incrementCount, decrementCount, setTotal,setCount} from './redux/actions'
import {connect} from 'react-redux'

const URL = "http://localhost:3000/api/todos";
// const URL = process.env.URL + '/api/todos'

class TodoList extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {data:[], count: 0, total:0};
        // updateList(this);
        this.updateList = this.updateList.bind(this);
        // this.handleChange = this.handleChange.bind(this);   
    }

    handleBtnActionIncrement = () => {
        this.props.onIncrementClick(this.state.count)
      }
      
    handleBtnActionDecrement = () => {
    this.props.onDecrementClick(this.state.count)
    }
    handleActionSetTotal = () => {
        this.props.onSetTotal(this.state.total)
    }
    componentDidMount(){
        this.updateList()
    }

    async updateList(){
        const response = await fetch(URL, {
            method: 'GET'
        });
        var data = await response.json();
        console.log(data);
        var c =0;
        for(var i =0; i<data.length;i++)
        {
            if( data[i].completed == true)
            {
                c = c+1;
            }
        }
        // this.mapStateToProps()
        this.setState({data: data,count:c, total: data.length});
        // handleActionSetTotal()
        this.props.onSetTotal(this.state.total)
        this.props.onSetCount(this.state.count)

        // fetch('URL'+"/todos")
        // .then(response =>  response.json())
        // .then(data => console.log(data)).catch(console.log("Error") );
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
    handleUpdateChecks(_id){
        // console.log(event.target._id);
        var i = this.state.data.findIndex(t => t["_id"] == _id)
        // console.log(i);
        // console.log(_id + " " + this.state.data[i]['completed']);
        var temp = this.state.data;
        var count = this.state.count;
        if(this.state.data[i].completed)
        {
            // decrementCount(count);
            this.handleBtnActionDecrement()
            this.setState({ count: --count });
        }
        else{
            // incrementCount(count);
            this.handleBtnActionIncrement()
            this.setState({ count: ++count });
        }
        // console.log("count  "+count);
        temp[i]['completed'] = ! this.state.data[i]['completed']
        this.setState({data:temp });
        console.log(_id);
        fetch(URL,{
            method:"PUT", 
            body:JSON.stringify(temp[i]),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then( response => {console.log(response);  this.updateList(); } ).catch(error => {console.log(error)});
    }
    
    render(){
        return(
            <div>
            {/* <button onClick={this.updateList} > Update </button> */}
            {/* <br /> */}
            
            {/* {this.state.data.map(d => (<li key={d.date}>{d.name}</li>))}  */}

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
      },
      onSetTotal:(total) => {
          dispatch(setTotal(total))
      },
      onSetCount:(count) => {
          dispatch(setCount(count))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)