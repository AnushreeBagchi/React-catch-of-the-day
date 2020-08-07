import React from "react";
import { render } from "react-dom";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import sampleFishes from "../../src/sample-fishes.js";
import Fish from "./Fish";
import base from "../base.js";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  componentDidMount() {
    //reinstate our locale storage
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    this.setState({"order": JSON.parse(localStorageRef)});

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context : this,
      state : 'fishes'
    });
  };

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  };

  componentWillUnmount(){
    base.removeBinding(this.ref);
  };

  addFish = (fish) => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add our new fish to our fishes
    fishes[`fish${Date.now()}`] = fish;
    //3. set the newfish object to state
    this.setState({
      fishes: fishes,
    });

    console.log(this.state.fishes);
  };
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };
  addToOrder = key => {
      //1.take copy of the state
      const order = {...this.state.order};
      //2. Either add or update the number in our order
      order[key] = order[key]+1 || 1;
      this.setState({
          order: order
      });

  };
  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});

  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea Food Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((fish) => (
              <Fish
                key={fish}
                index={fish}
                details={this.state.fishes[fish]}
                addToOrder={this.addToOrder}
              ></Fish>
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}
export default App;