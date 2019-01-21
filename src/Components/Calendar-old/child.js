import React, { Component, Fragment } from 'react';
import './style.css';

class Child extends Component {
  state = {
    hubby: "Software Developer and Engineer"
  }

  fromChildMethod = () => {
    alert("HELLO FROM CHILD WHICH ME ACCESS FROM PARENT");
  }

  render(){

    return(
      <Fragment>
        <h2>Hello From Child Again</h2>
      </Fragment>
    )
  }
}


export default Child;
