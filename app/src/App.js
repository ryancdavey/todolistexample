import React, { Component } from "react";

import Routes from './Routes';
import Navigation from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Navigation />
          <Routes />
        </div>
      </div>
    );
  }
}
      
export default App;
