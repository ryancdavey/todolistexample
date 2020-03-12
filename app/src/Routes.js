import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/NewTodo';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Redirect exact from="/logout" to="/" />

    <PrivateRoute path="/todos" exact component={TodoList} />
    <PrivateRoute path="/edit/:id" component={EditTodo} />
    <PrivateRoute path="/create" component={CreateTodo} />
  </Switch>
);
