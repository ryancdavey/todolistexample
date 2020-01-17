// import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import TaskList from './components/TaskList.js';
// import AddTaskForm from './components/Add.js';

// import Navbar from "./components/Navbar.component"
// import TasksList from "./components/todo-list.component";
// import EditTask from "./components/edit-todo.component";
// import CreateTask from "./components/create-todo.component";

// const uuid = require('uuid/v4');

// class App extends Component {
//     startingId = 2;
//     state = {
//       tasks: [{
//           "id": this.createUniqueId(),
//           "title": "Make presentation slides",
//           "category": "Work"
//         },
//         {
//           "id": this.createUniqueId(),
//           "title": "Sign birthday card",
//           "category": "Social"
//         },
//         {
//           "id": this.createUniqueId(),
//           "title": "Take out trash",
//           "category": "Personal"
//         }
//       ],
//       completedTasks: [],
//       editing: false
//     }
//     addTask = f=>f;
//     updateTask = f=>f;
//     deleteTask = f=>f;
//     completeTask = f=>f;

// /**
//   * adds task to the task list
//   * @param   {string}   title - text value for the newly created task
//   * @param   {string}   category - type for the newly created task
//   */
//     addTask(title, category) {
//       this.setState(prevState => ({
//         tasks: [
//           ...prevState.tasks,
//           {
//             id: this.createUniqueId(),
//             title,
//             category
//           }
//         ]
//       }));
//     }

// /**
//   * updates text for the 
//   * @param   {integer}   id - unique identifier for the task
//   * @param   {string}   title - new text label value for the task
//   */
//   updateTask(id, title) {
//     this.setState(prevState => ({
//       tasks: prevState.tasks.map(task =>
//         (task.id !== id) ?
//           task :
//           {
//             ...task,
//             title,
//           }
//       )
//     }));
//   }

// /**
//   * deletes tasks in the list
//   * @param   {integer}   id - unique identifier for the task
//   */
//   deleteTask(id) {
//     this.setState(prevState => ({
//       tasks: prevState.tasks.filter(task => task.id !== id)
//     }))
//   }

// /**
//   * completes tasks in the list and adds to completed list
//   * @param   {integer}   id - unique identifier for the task
//   */
//   completeTask(id) {
//     console.log(id); 
//     this.setState(prevState => ({
//       completedTasks: prevState.tasks.map(task =>
//         (task._id === id) ?
//         this.completedTasks :
//           [
//             ...this.completedTasks,
//             task,
//           ]
//       ),
//       tasks: prevState.tasks.filter(task => task.id !== id)
//     }));
//   }

//   /**
//     * Creates unique id for a newly created task
//     * @return  {string}  id - a uuid generated by uuid package
//     */
//   createUniqueId() { 
//     { id: uuid() }

//   }

//   render() {
//     const { addTask, updateTask, deleteTask, completeTask } = this;
//     const { tasks, completedTasks } = this.state;
//     return (
//       <Router>
//           <div className="container">
//             <Navbar />
//             <br/>
//             <Route path="/" exact component={TasksList} />
//             <Route path="/edit/:id" component={EditTask} />
//             <Route path="/create" component={CreateTask} />
//           </div>
//           {/* <div className="app">
//             <TaskList
//               tasks={tasks}
//               onUpdate={updateTask}
//               onRemove={deleteTask}
//               onCompletion={completeTask} 
//             />   
//           </div>
//           <div className="col-md-12">
//             <AddTaskForm onNewTask={addTask} />
//           </div>
//           <div className="completed">
//             <h1>Completed</h1>
//             <TaskList
//               tasks={completedTasks}
//               onUpdate={updateTask}
//               onRemove={deleteTask}
//               onCompletion={completeTask} 
//             />  
//           </div> */}
        
//       </Router>
//     )
//   } 
// }

// export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/NewTodo";
import EditTodo from "./components/EditTodo";
import TodosList from "./components/TodoList";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
