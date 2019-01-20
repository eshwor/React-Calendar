import React, { Component, Fragment } from 'react';
import moment from 'moment';
import './style.css';

class Calendar extends Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonth: false,
    showYear: false
  }

  constructor(props){
    super(props);

  }

  //Take a advantage of moment by using it's properies and methods
  weekdays = moment.weekdaysShort();
  months = moment.months();

  //Useful function define
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

  //Rendar Method Start
  render(){

    //Get all the weekdays
    let weekdays = this.weekdays.map((day) => {
      return (
        <th key={day}> {day} </th>
      )
    });

    //Get the blanks
    let blanks = [];
    for(let i = 0; i < this.firstDayOfMonth(); i++ ){
      blanks.push(<td key={i*80} className="blankCell"> {""} </td>);
    }

    //Get the days of full month
    let days = [];
    for(let d = 1; d <= this.daysInMonth(); d++){
      let className = (d == this.currentDay() ? "current-day" : "weekday");
      days.push(<td key={d*100} className={className}>{d}</td>);
    }

    //Merge it both blanks and real days in one variable
    let totalDays = [...blanks, ...days];
    let rows = [];
    let cells = [];

    //r means row and i means index
    totalDays.forEach((r, i) => {
      if((i % 7) !== 0){
        cells.push(r);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(r);
      }
      if(i === totalDays.length - 1){
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    //d means day and i means index
    let finalDays = rows.map((d, i) => {
      return (
        <tr key={i * 100 }>{d}</tr>
      );
    });


    return(
      <Fragment>
        <div className="wrapper">
          <header>
            <h1> Calendar </h1>
          </header>
          <section className="calendar-body">

            <table>
              <thead>
                <tr>{weekdays}</tr>
              </thead>
              <tbody>
                {finalDays}
              </tbody>
            </table>

          </section>


        </div>
      </Fragment>
    )
  }
}

export default Calendar;
