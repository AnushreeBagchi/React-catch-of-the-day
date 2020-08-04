import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {
    render(){
        const {fishes, order} = this.props;
        const orderIds = Object.keys(order);
        const total = orderIds.reduce((prevTotal, key) => {
            const price = fishes[key].price;
            const count = order[key];
            if(fishes[key].status == "available"){
                return prevTotal + price*count;
            }
            return prevTotal;
        },0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul>
                    {orderIds}
                </ul>
                <div> Total: {formatPrice(total)}</div>
            </div>
            )
    }
}

export default Order;