// import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
// import MDSpinner from 'react-md-spinner';

// class Login extends Component {
//   render() {
//     return(
//       <div>
//         <input type='text' placeholder='email'></input>
//         <input type='text' placeholder='password'></input>
//         <button >Log In</button>
//       </div>
//     )
//   }
// }

// export default Login;

import React, { Component } from 'react';
import axios from 'axios';

import withUser from './withUser';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleLoginInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleRegisterInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  } 

  onSubmitLogin = (event) => {
    event.preventDefault();
    this.props.user.actions.onLogin('foo');

    // axios.get('/login')
    //   .then(res => {
    //     this.props.user.actions.onLogin('foo');
    //     if (res.status === 200) {
    //       this.props.history.push('/profile');
    //     } else {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert('Error logging in please try again');
    //   });
    // fetch('/authenticate', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
  }

  onSubmitRegister = (event) => {
    event.preventDefault();
    axios.get('/register')
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/profile');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error registering account, please try again');
      });
  }

  render() {
    const { user } = this.props;

    if (user.isLoggedIn) {
      return <Redirect to="/todos" />
    }

    return (
      <div>
        <h1>Login Below</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleLoginInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleLoginInputChange}
          required
        />
        <button onClick={this.onSubmitLogin}>Login</button>
        <button onClick={this.onSubmitRegister}>Register</button>
    </div>
    );
  }
}

export default withUser(Login);
