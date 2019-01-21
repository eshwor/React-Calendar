import React, { Component, Fragment } from 'react';
import moment from 'moment';
import './style.css';

class Common extends Component {

  state = {
    dateContext: moment(),
    today: moment()
  }

  //Take a advantage of moment by using it's properies and methods
  weekdays = moment.weekdaysShort();
  months = moment.months();

  //Useful methods define
  year = () => {
    return this.state.dateContext.format("Y");
  }

  month = () => {
    return this.state.dateContext.format("MMMM");
  }

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }

  currentDate = () => {
    return this.state.dateContext.get("date");
  }

  currentDay = () => {
    return this.state.dateContext.format("D");
  }

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  test = () => {
    alert(" Hello From Common");
  }

  render(){
    return (
      <div>
        <p>Common Shared</p>
      </div>
    );
  }
}

export default Common;
