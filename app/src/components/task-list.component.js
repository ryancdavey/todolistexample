import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
  <tr>
    <td>{props.task.title}</td>
    
    <td>
      <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
    </td>
  </tr>
)

export default class TasksList extends Component {

  state = {
    tasks: []
  }

  deleteTask = f=>f;

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/' + id)
      .then(res => console.log(res.data));
    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    });
  }

  taskList() {
    this.state.tasks.map(currenttask => {
      return <Task task = {currenttask} deleteTask = {this.deleteTask} key = {currenttask._id}/>
    })
  }

  render () {
    return (
      <div>
        <h3>Task List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
      </div>
    )
  }
}