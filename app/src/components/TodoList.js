

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
//import Pagination from "./src/components/Pagination";
import ReactTable from "react-table";
//import "react-table/react-table.css";

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
      setTodos: [],
      currentTodos: [],
      isLoading: false,
      isDeleting: false,
      todoToDelete: null,
      currentPage: 1,
      setCurrentPage: 1,
      todosPerPage: 5,
      setTodosPerPage: 5,
      //indexOfFirstTodo: 0,
      //indexOfLastTodo: 9
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
      // for next button, create separate function that handles offset
      axios.get(`http://localhost:4000/todos?offset=0&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
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

  todoList = (todos) => {
    // let indexOfLastTodo = this.state.currentTodo * this.state.todosPerPage;
    // let indexOfFirstTodo = this.state.indexOfLastTodo - this.state.todosPerPage;
    // this.state.currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
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
  
  paginate = () => {

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
              { this.todoList(this.state.todos) }
            </tbody>
          </table>
          {/* <Pagination 
            todosPerPage={this.state.todosPerPage} 
            totalPosts={this.state.todos.length} 
            //paginate={paginate}
          /> */}
        </div>




      )
    }
  }
} 