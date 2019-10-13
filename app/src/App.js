import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
//import EditModal from './EditModal';
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
     editing: false

    }
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    }

/**
  * adds task to the task list
  * @param   {string}   title - text value for the newly created task
  * @param   {string}   category - type for the newly created task
  */
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

  // updateTask(id) {
  //   this.setState({editing: true});
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

/**
  * updates text for the 
  * @param   {integer}   id - unique identifier for the task
  * @param   {string}   title - new text label value for the task
  */
  updateTask(id, title) {
    console.log('??????');
    console.log(title);
      this.setState(prevState => ({
          tasks: prevState.tasks.map(task =>
              (task.id !== id) ?
                  task :
                  {
                      ...task,
                      title,
                  }
          )
      }))
  }

  // showModal(){
  //   console.log(1);
  //   this.setState({show: true});
  // }

  // handleInputChange(e) {
  //   this.setState({
  //       title: e.target.value
  //     });
  // }


/**
  * deletes tasks in the list
  * @param   {integer}   id - unique identifier for the task
  */
  deleteTask(id) {
    console.log(id);
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }))
  }

  completeTask(id) {
    console.log(id);

  }

  /**
    * Creates unique id for a newly created task
    * @return  {string}  id - a unique string containing 'id-' and a number
    */
  createUniqueId() {
    this.startingId += 1;
    let id = 'id-' + this.startingId;
    return id;
  }

  render() {
    const { addTask, updateTask, deleteTask, completeTask } = this;
    const { tasks } = this.state;
    return (
      <body>
        <div className="app">
            <TaskList
              tasks={tasks}
              onUpdate={updateTask}
                       onRemove={deleteTask}
                       onCompletion={completeTask} 
            />
            
          <AddTaskForm onNewTask={addTask} />
        </div>
        <div className="completed">
          <h1>Completed</h1>
        </div>
      </body>
    )
  } 

}

export default App;
