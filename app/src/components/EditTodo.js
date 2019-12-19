import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

  state = {
    todoDescription: '',
    todoCategory: '',
    todoPriority: '',
    todoCompleted: false
  }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                  todoDescription: response.data.todoDescription,
                  todoCategory: response.data.todoCategory,
                  todoPriority: response.data.todoPriority,
                  todoCompleted: response.data.todoCompleted
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoDescription = e => {
        this.setState({
          todoDescription: e.target.value
        });
    }

    onChangeTodoCategory = e => {
        this.setState({
          todoCategory: e.target.value
        });
    }

    onChangeTodoPriority = e => {
      this.setState({ todoPriority: e.target.value });
      // if (e.target.value==='High') { this.style.backgroundColor = 'red' } 
      // else if (e.target.value==='Medium') { this.style.backgroundColor = 'yellow' } 
      //
    }

    onChangeTodoCompleted = e => {
      this.setState({
        todoCompleted: !this.state.todoCompleted
      });
  }

    onSubmit = e => {
        e.preventDefault();
        const todo = {
          todoDescription: this.state.todoDescription,
          todoCategory: this.state.todoCategory,
          todoPriority: this.state.todoPriority,
          todoCompleted: this.state.todoCompleted
        };
        console.log(todo);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, todo)
            .then(res => {
              
              this.props.history.push('/');
              console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todoDescription}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todoCategory}
                                onChange={this.onChangeTodoCategory}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todoPriority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todoPriority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todoPriority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                              />
                            <label className="form-check-label">High</label>
                        </div>
                </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todoCompleted}
                                value={this.state.todoCompleted}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}