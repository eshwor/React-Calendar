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

  //JUMP TO MONTH
  setMonth = (month) => {
       let monthNo = this.months.indexOf(month);
       let dateContext = Object.assign({}, this.state.dateContext);
       dateContext = moment(dateContext).set("month", monthNo);
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
               <div key={data}>
                   <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                       {data}
                   </a>
               </div>
           );
       });

       return (
           <div className="month-popup">
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
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
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
       dateContext = moment(dateContext).set("year", year);
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
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
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

    /*
    //List of months
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dropDownMonths = monthsList.map((month) => {
      return (
        <option value={month}> {month} </option>
      );
    });
    function testFunction(){
        let selecter = document.getElementById('selectMe');
        console.log(selecter.value);
    }
    */
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
          <section>
            <this.MonthNav />
            {" "}
            <this.YearNav />
          </section>
          <section>
            <span onClick={(e)=> {this.prevMonth()}}>Pre </span>
            <span onClick={(e)=> {this.nextMonth()}}> Next</span>
          </section>

        </div>
      </Fragment>
    )
  }
}

export default Calendar;
