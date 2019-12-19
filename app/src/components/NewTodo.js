
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

        state = {
          todoDescription: '',
          todoCategory: '',
          todoPriority: '',
          todoCompleted: false
        }

    onChangeTodoDescription = event => {
        this.setState({
          todoDescription: event.target.value
        });
    }

    onChangeTodoCategory = event => {
        this.setState({
          todoCategory: event.target.value
        });
    }

    onChangeTodoPriority = e => {
      this.setState({ todoPriority: e.target.value });
      // if (e.target.value==='High') { this.style.backgroundColor = 'red' } 
      // else if (e.target.value==='Medium') { this.style.backgroundColor = 'yellow' } 
      // else { this.style.backgroundColor = 'green' }  
    }

    onChangeTodoCompleted = event => {
      this.setState({
        todoCompleted: event.target.value
      });
    }

    /**
     * deletes tasks in the list
     * @param   {integer}   id - unique identifier for the task
     */
    // deleteTask(id) {
    //   this.setState(prevState => ({
    //     tasks: prevState.tasks.filter(task => task.id !== id)
    //   }))
    // }

    onSubmit = e => {
      e.preventDefault();
      var date = new Date();
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todoDescription}`);
        console.log(`Todo category: ${this.state.todoCategory}`);
        console.log(`Todo priority: ${this.state.todoPriority}`);
        console.log(`Todo created at: ${date.toLocaleString('en-US')}`);
        console.log(`Todo Completed: ${this.state.todoCompleted}`);

        const newTodo = {
          todoDescription: this.state.todoDescription,
          todoCategory: this.state.todoCategory,
          todoPriority: this.state.todoPriority,
          todoCreatedAtDate: date.toLocaleString('en-US'),
          todoCompleted: this.state.todoCompleted
      };

      axios.post('http://localhost:4000/todos/add', newTodo)
          .then(res => {
            this.props.history.push('/');
            console.log(res.data);
          })
          .catch(err => console.log(err));

        this.setState({
          todoDescription: '',
          todoCategory: '',
          todoPriority: '',
          todoCreatedAtDate: '',
          todoCompleted: false
        });
        
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
                  <input type="submit" value="Create Todo" className="btn btn-primary" />
              </div>
          </form>
      </div>
        )
    }
}