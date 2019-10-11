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
     this.state = { // @brodey - This is also fine, but with class properties (google that), you can just do:
       /**
       * state = { ... }
       */
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
    this.deleteTask = this.deleteTask.bind(this); // @brodey - This is fine, but you can use arrow functions inside of here to avoid needing to do this.

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
  // } // @brodey - Don't leave commented code. If you don't need it, delete it.

/**
  * updates text for the 
  * @param   {integer}   id - unique identifier for the task
  * @param   {string}   title - new text label value for the task
  */
  updateTask(id) {

      this.setState(prevState => ({
          tasks: prevState.tasks.map(task =>
              (task.id !== id) ?
                  task :
                  {
                      ...task,
                      title: AddTaskForm._title
                  }
          )
      }))
  }

  // showModal(){
  //   console.log(1);
  //   this.setState({show: true});
  // } // @brodey - Don't leave commented code. If you don't need it, delete it.

  // handleInputChange(e) {
  //   this.setState({
  //       title: e.target.value
  //     });
  // } // @brodey - Don't leave commented code. If you don't need it, delete it.


/**
  * deletes tasks in the list
  * @param   {integer}   id - unique identifier for the task
  */
  deleteTask(id) {
    console.log(id); // @brodey - Make sure to remove console logs after you're done testing.
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id) // @brodey - Solid job on this
    }))
  }

  completeTask(id) {
    console.log(id); // @brodey - You'll have to take this task ID and create a new list of tasks in your UI
    // @brodey - It will look something like: { completedTasts: [{ ... }] }
    // @brodey - So in this handler, you'll do a find on the task with the above ID, and add it to that completedTasks array.
    // @brodey - Once that's done, you'll filter that out of the previous array.
  }

  /**
    * Creates unique id for a newly created task
    * @return  {string}  id - a unique string containing 'id-' and a number
    */
  createUniqueId() {
    this.startingId += 1; // @brodey - No need to do this. Just do: { id: uuid.v4() }
    let id = 'id-' + this.startingId;
    return id;
  }

  render() {
    const { addTask, updateTask, deleteTask, completeTask } = this;
    const { tasks } = this.state;
    
    // @brodey - Make sure to fix the indentation below.
    // @brodey - Indenting should look like:
    /**
     * <TaskList
     *   onUpdate={onUpdate}
     *   onRemove={onRemove}
     *   onCompletion={onCompletion}
     * />
     **/
    // @brodey - Notice above how the closing brackets align with the starting, and the props are indented 2 spaces.
    
    return (
      <body>
        <div className="app">
            <TaskList tasks={tasks}
                       onUpdate={updateTask}
                       onRemove={deleteTask}
                       onCompletion={completeTask} />
          <AddTaskForm onNewTask={addTask} />
        </div>
      </body>
    )
  } 

}

export default App;
