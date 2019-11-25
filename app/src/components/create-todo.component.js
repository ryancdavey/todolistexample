
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = f=>f;
        this.onChangeTodoCategory = f=>f;
        this.onSubmit = f=>f;

        this.state = {
            todo_description: '',
            todo_category: '',
            todo_priority: '',
            todo_completed: false
        }
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

    onChangeTodoCompleted = event => {
      this.setState({
          todo_completed: !this.state.todo_completed
      });
    }

    onSubmit(e) {
      e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo category: ${this.state.todo_category}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
          todo_description: this.state.todo_description,
          todo_category: this.state.todo_category,
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
          <h3 align="center">Update Todo</h3>
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
                  <input type="submit" value="Update Todo" className="btn btn-primary" />
              </div>
          </form>
      </div>
        )
    }
}