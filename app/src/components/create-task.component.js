import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTask extends Component {

  state = {
      title: "",
      isEditing: false,
  }

  onChangeTask = f=>f;
  onSubmit = f=>f;

  onChangeTask = event => this.setState({
    title: event.target.value,
  });

  onSubmit = event => {
    event.preventDefault();
    
    const task = {
      title: this.state.title,
    }
    console.log(task);

    axios.post('http://localhost:5000/tasks/add', task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render () {
    console.log("create");
    return (
      <div>
      <h3>Create New Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Task: </label>
          <input 
            type="text" 
            className="form-control"
            value={this.state.title}
            onChange={this.onChangeTask}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create 'Task' Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}