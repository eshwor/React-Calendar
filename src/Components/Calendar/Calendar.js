import React, { Component, Fragment } from 'react';
import Moment from 'moment';
import './style.css';

//Statefull Component
class Calendar extends Component {

  constructor(props){
    super(props);
  }

  state = {
    dateContext: Moment(),
    today: Moment(),
    weekdays: Moment.weekdaysShort(),
    months: Moment.months()
  }

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
    let firstDay = Moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  //JUMP TO MONTH
  setMonth = (month) => {
       let monthNo = this.state.months.indexOf(month);
       let dateContext = Object.assign({}, this.state.dateContext);
       dateContext = Moment(dateContext).set("month", monthNo);
       this.setState({
           dateContext: dateContext
       });
   }

  onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
  }

  SelectList = (props) => {
       let popup = props.data.map((data) => {
           return (
               <div key={data} >
                   <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                       {data}
                   </a>
               </div>
           );
       });

       return (
           <div className="month-popup" >
               {popup}
           </div>
       );
   }

  onChangeMonth = (e, month) => {
      this.setState({
          showMonthPopup: !this.state.showMonthPopup
      });
  }

  MonthNav = () => {
        return (
            <div onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
              <select>
                <option>{this.month()}</option>
              </select>
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.state.months} />
                }
            </div>
        );
    }
//JUMP TO MONTH END

//JUMP TO YEAR

showYearEditor = () => {
    this.setState({
        showYearNav: true
    });
}

setYear = (year) => {
       let dateContext = Object.assign({}, this.state.dateContext);
       dateContext = Moment(dateContext).set("year", year);
       this.setState({
           dateContext: dateContext
       })
}

   onYearChange = (e) => {
       this.setYear(e.target.value);
       this.props.onYearChange && this.props.onYearChange(e, e.target.value);
   }

   onKeyUpYear = (e) => {
       if (e.which === 13 || e.which === 27) {
           this.setYear(e.target.value);
           this.setState({
               showYearNav: false
           })
       }
   }

YearNav = () => {
     return (
         this.state.showYearNav ?
         <input
             defaultValue = {this.year()}
             className="editor-year"
             ref={(yearInput) => { this.yearInput = yearInput}}
             onKeyUp= {(e) => this.onKeyUpYear(e)}
             onChange = {(e) => this.onYearChange(e)}
             type="number"
             placeholder="year"/>
         :
         <span
             className="label-year"
             onDoubleClick={(e)=> { this.showYearEditor()}}>
             {this.year()}
         </span>
     );
 }

 //JUMP TO YEAR END

 //NEXT AND PREVIEW

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = Moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = Moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }
// NEXT AND PREVIEW END

  //RENDER METHOD START FROM HERE :::::::::::::::::::
  render(){

    //Get Weekdays: Sun, Mon, Tue, Wed, Thu, Fri, Sat
    let weekdays = this.state.weekdays.map((day) => {
      return (
        <th key={day}> {day} </th>
      )
    });


    //Display All the Days Of Specific Months
    //First Get the blanks cells
    let blanks = [];
    for ( let i = 0; i < this.firstDayOfMonth(); i++ ) {
      blanks.push(<td key={i * 80 } className="blankCell"> {" "} </td>);
    }

    //Now Get All the Real Days of The Months
    let days = [];
    for ( let d = 1; d <= this.daysInMonth(); d++ ){
      //Also Add the Class For To current-day or all other days
      let className = ( d == this.currentDay() ? "current-day" : "weekday" );
      days.push(<td key={ d * 10 } className={ className }> {d} </td>);
    }

    //Now Clone It Both blanks and days arrays and make a full month
    let fullMonthDays = [...blanks, ...days];

    //Now Loop All of It and Dispaly It to The Table Row and Data
    let rows = [];
    let cells = [];
    fullMonthDays.forEach((row, index) => {
      if ((index % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }

      if(index === fullMonthDays.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    //Now Map it and make it ready to dispaly to the Table
    //d means day and i means index
    let finalFullMonthDays = rows.map((d, i) => {
      return (
        <tr key={ i * 10 }>{d}</tr>
      );
    });


    return (
      <Fragment>

      <div className="wrapper">

        <header>
          <h1> Calendar </h1>
          <h4> { this.month()} / {this.year()} </h4>
        </header>

        <section className="calendar-body">
          <table>
            <thead>
              <tr>{weekdays}</tr>
            </thead>
            <tbody>
              {finalFullMonthDays}
            </tbody>
          </table>
        </section>

        <section className="footer-section">
          <div className="month-dropdown">
          <label>Select Month: </label>
            <this.MonthNav />
          </div>
          <div className="year-dropdown">
            <label> Select Year: </label>
              <this.YearNav/>
          </div>

        </section>

      </div> {/*END OF MAIN WRAPPER DIV*/}


      </Fragment>
    );
  }
}

export default Calendar;
