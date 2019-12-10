

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr className={`Priority-${props.todo.todo_priority}`}>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_category}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}></td>
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
    this.state = {todos: []};
  }

  componentDidMount() {
     axios.get('http://localhost:4000/todos/')
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function (error){
        console.log(error);
      })
  }

  removeTodo = (event, todo_id) => {
    event.preventDefault();
    axios.delete('http://localhost:4000/todos/'+todo_id)
      .then(res => {
        this.setState(previousState => {
          return {
            todos: previousState.todos.filter(todo => todo.id !== todo_id)
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
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