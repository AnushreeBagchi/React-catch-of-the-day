import React from "react";
import AddFishForm from "./AddFishForm";
import EditFish from "./EditFish";
import PropTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
class Inventory extends React.Component {
  state = {
    owner: null,
    uid: null,
  };

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string,
  };

  authHandler = async (authData) => {
    //1. lookup the current store in firebase db
    const store = await base.fetch(this.props.storeId, { context: this });
    //2. claim if there is no owner
    if (!store.owner) {
      //saveit as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //3. set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    // const authProvider = new firebase.auth.GithubAuthProvider();
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out");
    await firebase.auth().signOut();
    this.setState({uid: null})
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({user});
      }
    })
  }

  render() {
    const logout = (
      <button 
        className="Logout" 
        onClick={this.logout}>
        Log out!
      </button>
    );

    // check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>
            Sorry you are not the owner!
            {logout}
          </p>
        </div>
      );
    }
    // they must be the owner just render the inventory
    const fishes = this.props.fishes;
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(fishes).map((key) => (
          <EditFish
            key={key}
            index={key}
            fish={fishes[key]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
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
