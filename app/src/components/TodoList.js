

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import Loader from './Loader';

const Todo = props => (
  <tr className={`Priority-${props.todo.todoPriority}`}>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoDescription}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoCategory}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoPriority}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoCreatedAtDate}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}></td>
    <td>
      <Link to={"/edit/"+props.todo._id}>Edit</Link>
      <br></br>
      <button onClick={e => props.onClick(e, props.todo._id)}>Delete</button>
    </td>
  </tr>
)

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isLoading: false
    };

  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  wait = async (milliseconds = 2000) => {
    await this.sleep(milliseconds);
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    //this.wait(2000);
    console.log('loading todos');
     axios.get('http://localhost:4000/todos/')
      .then(response => {
        console.log('todos loaded');
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  

  removeTodo = (event, todo_id) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    axios.delete('http://localhost:4000/todos/'+todo_id)
      .then(res => {
        this.setState(previousState => {
          return {
            todos: previousState.todos.filter(todo => todo.id !== todo_id),
          };
        });
        this.setState({ isLoading: false });
        //this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ isLoading: false });
    
  }

  todoList = () => {
    return this.state.todos.map((currentTodo, i) => {
        return (<Todo 
          todo={currentTodo} 
          key={i} 
          onClick={this.removeTodo}
        />);
      })
    }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
        {/* <div>Select <strong>Create Todo</strong> to add to the list</div> */}
        <MDSpinner className="spinner" size={100}/>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Todo List</h3>
          <table className="table" style={{ marginTop: 20 }} >
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { this.todoList() }
            </tbody>
          </table>
        </div>
      )
    }
  }
} 