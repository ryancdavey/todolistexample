

import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import ReactTable from "react-table";
import Pagination from './Pagination';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
//import "react-table/react-table.css";

const Todo = props => (
  <tr className={`Priority-${props.todo.todoPriority}`}>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoDescription}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoCategory}</td>
    <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoPriority}</td>
    <td className={props.todo.todoCompleted ? 'completed-button' : ''}>{props.todo.todoCreatedAtDate}</td>
    <td>
      <Link to={"/edit/"+props.todo._id} className={props.todo.todoCompleted ? 'completed-button' : ''} >Edit</Link>
      <br></br>
      <button
        disabled={props.isDeleting && props.todo._id === props.todoToDelete}
        className={props.todo.todoCompleted ? 'completed-button' : ''}
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
      offset: 0,
      //currentPage: 1,
      //setCurrentPage: 1,
      todosPerPage: 10,
      //setTodosPerPage: 5,
      //indexOfFirstTodo: 0,
      //indexOfLastTodo: 9
      toastMessage:'sample'
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
      axios.get(`http://localhost:4000/todos?offset=${this.state.offset}&limit=${this.state.todosPerPage}`)
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
    console.log(todo_id);
    this.setState({ isDeleting: true, todoToDelete: todo_id });
    let deletedTodo;
    axios.get('http://localhost:4000/todos/'+todo_id)
      .then(res => {
        deletedTodo = res.data;
        console.log(deletedTodo); 
    });

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
        let toast = document.getElementById('snackbar');
        this.setState({ toastMessage: `Todo deleted: ${deletedTodo.todoDescription}` });
        toast.className = 'show';
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
      });
    }, 1500);

  }

  todoList = (todos) => {
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
  
  onChangePage(currentTodos) {
    this.setState({ currentTodos: currentTodos });
  }

  getPreviousPage = () => {
    this.setState({ 
      isLoading: true,
      offset: this.state.offset-1
    });
    
    console.log('loading todos');
    setTimeout(() => {
      // for next button, create separate function that handles offset
      axios.get(`http://localhost:4000/todos?offset=${this.state.offset}&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
        console.log(error);
      });
    }, 1000);
  }

  getNextPage = () => {
    this.setState({ 
      isLoading: true
    });
    
    console.log('loading todos');
    setTimeout(() => {
      // for next button, create separate function that handles offset
      axios.get(`http://localhost:4000/todos?offset=${this.state.offset}&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
        console.log(error);
      });
    }, 1000);
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
          <span>
            <button
              disabled={this.state.isLoading}
              className={'prev-button'}
              onClick={this.getPreviousPage}
            >
              Previous
            </button>
            <button
              disabled={this.state.isLoading}
              className={'next-button'}
              onClick={this.getNextPage}
            >
              Next
            </button>
            <label>
              Viewing Todos {this.state.offset * this.state.todosPerPage + 1} through {(this.state.offset + 1) * this.state.todosPerPage}
            </label>
          </span>
          {/* <Pagination items={this.exampleItems} onChangePage={this.onChangePage} /> */}
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
          <div id="snackbar">{this.state.toastMessage}</div>
        </div>
      )
    }
  }
} 