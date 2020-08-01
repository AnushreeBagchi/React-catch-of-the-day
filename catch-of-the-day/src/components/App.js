import React from 'react';
import {render} from 'react-dom';
import Header from './Header.js';
import Inventory from './Inventory.js';
import Order from './Order.js';


class App extends React.Component {
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Sea Food Market"/>
                </div>
                <Order/>
                <Inventory/>
            </div>
        )
        }
}
export default App;