import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import withUser from './withUser';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={props => (
        user.isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export default withUser(PrivateRoute);
