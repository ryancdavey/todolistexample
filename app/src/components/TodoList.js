

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
      todosPerPage: 5,
      //setTodosPerPage: 5,
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
      axios.get(`http://localhost:4000/todos/?offset=${this.state.offset}&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ todos: response.data, isLoading: false });
      })
      .catch(function (error){
        console.log(error);
      });
    }, 1000);
  }

  // filterTodoDescriptions.addEventListener('input', e => {
  //   const element = e.target.value.toLowerCase()
  //   const newUser = users
  //     .filter(user => user.login
  //     .toLowerCase()
  //     .includes(element))
  
  //     showUsers(newUser)
  // })
  filterTodoDescriptions = event => {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase();
    this.setState({ isLoading: true });
    console.log('loading filtered descriptions');
    setTimeout(() => {
      axios.get(`http://localhost:4000/todos`)
      .then(response => {
        console.log('filtered descriptions loaded');
        //console.log(response.data);
        this.setState({ 
          todos: response.data.filter(todo => todo.todoDescription.toLowerCase().includes(searchTerm)),  
          isLoading: false
        });
      })
      .catch(function (error){
        console.log(error);
      })
      console.log(this.state.todos);
    }, 1000);
  }

  filterTodoCategories = event => {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase();
    this.setState({ isLoading: true });
    console.log('loading filtered descriptions');
    setTimeout(() => {
      axios.get(`http://localhost:4000/todos`)
      .then(response => {
        console.log('filtered descriptions loaded');
        console.log(response.data);
        this.setState({ 
          todos: response.data.filter(todo => todo.todoCategory.toLowerCase().includes(searchTerm)),  
          isLoading: false
        });
      })
      .catch(function (error){
        console.log(error);
      })
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
      
    });
    
    console.log('loading todos');
  
      // for next button, create separate function that handles offset
      axios.get(`http://localhost:4000/todos?offset=${this.state.offset-this.state.todosPerPage}&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ 
          todos: response.data, 
          isLoading: false,
          offset: this.state.offset-this.state.todosPerPage
        });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  getNextPage = () => {
    this.setState({ 
      isLoading: true,
      
    });
    
    console.log('loading todos');

      axios.get(`http://localhost:4000/todos?offset=${this.state.offset+this.state.todosPerPage}&limit=${this.state.todosPerPage}`)
      .then(response => {
        console.log('todos loaded');
        this.setState({ 
          todos: response.data, 
          isLoading: false,
          offset: this.state.offset + this.state.todosPerPage
        });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  render() {
    console.log('rendering...');

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
              disabled={ this.state.isLoading || this.state.offset === 0 }
              className={'prev-button'}
              onClick={this.getPreviousPage}
            >
              Previous
            </button>
            <button
              disabled={this.state.isLoading || this.state.todos.length < this.state.todosPerPage}
              className={'next-button'}
              onClick={this.getNextPage}
            >
              Next
            </button>
            <span></span>
            <label>
              Viewing Todos { this.state.offset === 0 ? 1 : this.state.offset + 1 } through { this.state.offset + this.state.todos.length }
            </label>
            <div>
              <input 
                type="text" 
                id="filter-descriptions" 
                placeholder="Filter descriptions..." 
                className="appearance-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 rounded-lg text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
              /> 
              <button
                disabled={this.state.isLoading}
                className={'next-button'}
                onClick={this.filterTodoDescriptions}
              >
                Filter
              </button>
              <input 
                type="text" 
                id="filter-categories" 
                placeholder="Filter categories..."
                className="appearance-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 rounded-lg text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
              /> 
              <button
                disabled={this.state.isLoading}
                className={'next-button'}
                onClick={this.filterTodoCategories}
              >
                Filter
              </button>
            </div>
          </span>
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