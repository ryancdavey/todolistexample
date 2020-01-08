

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
      <button
        disabled={props.isDeleting && props.todo._id === props.todoToDelete}
        onClick={e => props.onClick(e, props.todo._id)}
      >
        {props.isDeleting && props.todo._id === props.todoToDelete ? 'Deleting...' : 'Delete'}
      </button>
    </td>
  </tr>
)

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isLoading: false,
      isDeleting: false,
      todoToDelete: null,
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
    
    console.log('loading todos');
    setTimeout(() => {
      axios.get('http://localhost:4000/todos/')
      .then(response => {
        console.log('todos loaded');
        //this.wait(2000);
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
        //this.setState({ isLoading: false });
        console.log(error);
      });
    }, 1000);
  }

  

  removeTodo = (event, todo_id) => {
    event.preventDefault();
    this.setState({ isDeleting: true, todoToDelete: todo_id });

    setTimeout(() => {
      axios.delete('http://localhost:4000/todos/'+todo_id)
      .then(res => {
        this.setState(previousState => {
          return {
            todos: previousState.todos.filter(todo => todo._id !== todo_id),
          };
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isDeleting: false, todoToDelete: null });
      });
    }, 1500)  
  }

  todoList = () => {
    return this.state.todos.map((currentTodo, i) => {
        return (<Todo 
          todo={currentTodo} 
          key={i} 
          onClick={this.removeTodo}
          isDeleting={this.state.isDeleting}
          todoToDelete={this.state.todoToDelete}
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