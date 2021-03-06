import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Meme from './components/Meme';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Home} />
          <Route path="/meme/:id" component={Meme} />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
