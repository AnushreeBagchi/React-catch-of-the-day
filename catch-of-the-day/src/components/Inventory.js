import React from "react";
import AddFishForm from "./AddFishForm";
import EditFish from "./EditFish";

class Inventory extends React.Component {
  render() {
    const fishes = this.props.fishes;
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(fishes).map((key) => (
          <EditFish key={key} index={key} fish={fishes[key]} updateFish={this.props.updateFish}/>
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
