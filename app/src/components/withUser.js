import React from 'react';

import { UserContext } from './UserProvider';

const withUser = ComposedComponent => props => (
  <UserContext.Consumer>
    {user => <ComposedComponent {...props} user={user} />}
  </UserContext.Consumer>
);

export default withUser;
