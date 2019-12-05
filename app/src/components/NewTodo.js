
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

        state = {
            todo_description: '',
            todo_category: '',
            todo_priority: '',
            todo_completed: false
        }

    onChangeTodoDescription = event => {
        this.setState({
            todo_description: event.target.value
        });
    }

    onChangeTodoCategory = event => {
        this.setState({
            todo_category: event.target.value
        });
    }

    onChangeTodoPriority = e => {
      this.setState({
          todo_priority: e.target.value
      });
    }

    onChangeTodoCompleted = event => {
      this.setState({
          todo_completed: event.target.value
      });
    }

    onSubmit = e => {
      e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo category: ${this.state.todo_category}`);
        console.log(`Todo priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
          todo_description: this.state.todo_description,
          todo_category: this.state.todo_category,
          todo_priority: this.state.todo_priority,
          todo_completed: this.state.todo_completed
      };

      axios.post('http://localhost:4000/todos/add', newTodo)
          .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_category: '',
            todo_completed: false
        })
    }

    render() {
        return (
          <div>
          <h3 align="center">Create Todo</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                  <label>Description: </label>
                  <input  type="text"
                          className="form-control"
                          value={this.state.todo_description}
                          onChange={this.onChangeTodoDescription}
                  />
              </div>
              <div className="form-group">
                  <label>Category: </label>
                  <input 
                          type="text" 
                          className="form-control"
                          value={this.state.todo_category}
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
                                    checked={this.state.todo_priority==='Low'} 
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
                                    checked={this.state.todo_priority==='Medium'} 
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
                                    checked={this.state.todo_priority==='High'} 
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
                          checked={this.state.todo_completed}
                          value={this.state.todo_completed}
                  />
                  <label className="form-check-label" htmlFor="completedCheckbox">
                      Completed
                  </label>                        
              </div>

              <br />

              <div className="form-group">
                  <input type="submit" value="Create Todo" className="btn btn-primary" />
              </div>
          </form>
      </div>
        )
    }
}