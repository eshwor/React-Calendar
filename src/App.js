import React, { Component } from 'react';
import './App.css';//Global Stylesheet
import Calendar from './Components/Calendar/Calendar';

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
