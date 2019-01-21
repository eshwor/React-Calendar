import React, { Component } from 'react';
import moment from 'moment';
import Calendar from './Components/Calendar/Calendar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar/>
      </div>
    );
  }
}

export default App;
