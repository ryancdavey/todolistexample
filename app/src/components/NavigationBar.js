import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withUser from './withUser';

class Navbar extends Component {

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h3>Todo App</h3>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {user.isLoggedIn ? (
              <>
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <button onClick={() => user.actions.onLogout()} className="nav-link">Log Out</button>
                </li>
              </>
            ) : (
              <li className="navbar-item">
                <Link to="/" className="nav-link">Log In</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withUser(Navbar);
