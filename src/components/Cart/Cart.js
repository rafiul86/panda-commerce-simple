import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const cart = props.cart ;
    const totalPrice = cart.reduce((total , pd)=> total + pd.price * pd.quantity,0);
    const tax =Number((totalPrice/10).toFixed(2));
    let shippingCost ;
    if(totalPrice > 235){
        shippingCost = 0;
    }
    else if(totalPrice > 0) {
        shippingCost = 5 ;
        }
    else{
         shippingCost = 0;
        }
    
    return (
        <div className = "review">
            <h1>Items Ordered : {cart.length}</h1>
            <h3>Total Price : {totalPrice.toFixed(2)}</h3>
            <h4>Shipping Cost : {shippingCost}</h4>
            <h3>Tax + Vat % : {tax}</h3>
            <h2>Grand Total {((totalPrice + shippingCost + tax).toFixed(2))}</h2>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;