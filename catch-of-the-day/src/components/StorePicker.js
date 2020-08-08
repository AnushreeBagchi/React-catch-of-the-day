import React from "react";
import { getFunName } from "../helpers.js";
import PropTypes from "prop-types";
class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };
  // We cannot access this inside any of the functions we create. So we need to bind this inside constructor
  // Or else we can create the function as arrow function
  // constructor(){
  //     super();
  //     this.goToStore = this.goToStore.bind(this);
  // }
  myInput = React.createRef();
  goToStore = (event) => {
    //1. stop form from submitting
    event.preventDefault();
    //2. get text from input
    const storeName = this.myInput.current.value;
    //3. change the page to /store/entered-data
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a store</h2>
          <input
            type="text"
            required
            defaultValue={getFunName()}
            ref={this.myInput}
          ></input>
          <button type="submit" text="Visit Store">
            Visit Store >>
          </button>
        </form>
      </>
    );
  }
}

export default StorePicker;
