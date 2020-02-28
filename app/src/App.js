import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CreateTodo from "./components/NewTodo";
import EditTodo from "./components/EditTodo";
import TodosList from "./components/TodoList";
//import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Secret from './components/Secret';
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      // <div>
      //   <Router>
      //   <ul>
          
      //     <li><Link to="/">Home</Link></li>
      //     <li><Link to="/secret">Secret</Link></li>
      //     <li><Link to="/login">Log In</Link></li>
      //   </ul>
      //     <Route path="/" exact component={Home} />
      //     <Route path="/secret" component={Secret} />
      //     <Route path="/login" component={Login} />
      //     </Router>
      // </div>

      <div>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h3>Todo App</h3>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/logout" className="nav-link">Log Out</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          {/* <Route path="/" component={Login}/> */}
          <Route path="/todos" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/logout" component={CreateTodo}/>
        </div>
      </Router>
      
      </div>
    );
  }
}
      
//     );
//   }
// }

export default App;
