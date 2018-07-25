import React, { Component } from 'react'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import Login from './Components/Login/Login'
import Nav from './Components/Header/Header'
import './App.css';

class App extends Component {
  render() {
    return (
      
      (this.props.location.pathname === '/') ?
      
        <div className="App">
          <Login/>
        </div>
        
        :

        <div className="App">
          <Nav />
          {routes}
        </div>
      
    );
  }
}

export default withRouter(App);
