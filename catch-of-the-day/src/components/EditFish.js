import React from "react";
import PropTypes from "prop-types";
class EditFish extends React.Component {
  static = {
    index: PropTypes.string,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    fish: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
    }),
  };
  onChangeHandler = (event) => {
    // update the cureent fish
    const updatedFish = { ...this.props.fish };
    updatedFish[event.currentTarget.name] = event.currentTarget.value;
    this.props.updateFish(this.props.index, updatedFish);
  };
  removeFishHandler = () => {
    this.props.removeFish(this.props.index);
  };
  render() {
    const fish = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          onChange={this.onChangeHandler}
          value={fish.name}
        />
        <input
          name="price"
          type="text"
          onChange={this.onChangeHandler}
          value={fish.price}
        />
        <select
          name="status"
          type="text"
          onChange={this.onChangeHandler}
          value={fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          type="text"
          onChange={this.onChangeHandler}
          value={fish.desc}
        />
        <input
          name="image"
          type="text"
          onChange={this.onChangeHandler}
          value={fish.image}
        />
        <button onClick={this.removeFishHandler}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFish;
