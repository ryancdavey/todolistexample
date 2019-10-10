import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import Add from './Add';
import AddTaskForm from './Add';

class App extends Component {

  startingId = 2;

   constructor (props) {
    super(props);
     this.state = {
        tasks: [{
          "id": "id-0",
          "title": "Make presentation slides",
          "category": "Work"
        },
        {
          "id": "id-1",
          "title": "Sign birthday",
          "category": "Social"
        },
        {
          "id": "id-2",
          "title": "Take out trash",
          "category": "Personal"
        }
     ],
     pickerValue: "a",

    }
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    }

    addTask(title, category) {
      this.setState(prevState => ({
        tasks: [
            ...prevState.tasks,
            {
                id: this.createUniqueId(),
                title,
                category
            }
        ]
      }))
    }

  updateTask(id, title) {
    
      this.setState(prevState => ({
          tasks: prevState.tasks.map(task =>
              (task.id !== id) ?
                  task :
                  {
                      ...task,
                      title
                  }
          )
      }))
  }

  showModal(){
    console.log(1);

  }

  // handleInputChange(e) {
  //   this.setState({
  //       title: e.target.value
  //     });
  // }



  deleteTask(id) {
    console.log(id);
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }))
  }

  completeTask(id) {
    console.log(id);
  }

  createUniqueId() {
    this.startingId += 1;
    let id = 'id-' + this.startingId;
    return id;
  }

  render() {
    const { addTask, handleInputChange, showModal, updateTask, deleteTask, completeTask } = this;
    const { tasks } = this.state;
    return (
      <body>
        <div className="app">
            <TaskList tasks={tasks}
                       onUpdate={showModal}
                       onRemove={deleteTask}
                       onCompletion={completeTask} />
          <AddTaskForm onNewTask={addTask} />
        </div>
      </body>
    )
  } 

}

export default App;
