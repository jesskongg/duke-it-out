import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';

class App extends Component {
  state = {
  };

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/Create">Create</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <Route path="/Create" component={CreateRoom}/>
        </div>
      </div>
    );
  }
}

export default App;
