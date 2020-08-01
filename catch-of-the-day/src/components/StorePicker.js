import React from 'react';

class StorePicker extends React.Component {
    render(){
        return (
            <>
                <form className="store-selector">
                    <h2>Please Enter a store</h2>
                    <input type="text" required placeholder="Enter Store"></input>
                    <button type="submit" text="Visit Store">Visit Store >></button>
                </form>
            </>
            )
    }
}

export default StorePicker;