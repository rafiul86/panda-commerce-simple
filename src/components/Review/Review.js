import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
     const [cart,setCart]  = useState([]);
     const history = useHistory()
     const handleProceed = () => {
        setCart([]);
        processOrder()
        history.push('/shipment')
    }
     const removeItem = (productKey) => {
         const newCart = cart.filter(pd => pd.key !== productKey )
         setCart(newCart);
         removeFromDatabaseCart(productKey);
     }
        useEffect(()=>{
           const savedCart = getDatabaseCart();
           const productKeys = Object.keys(savedCart);
                const cartProducts = productKeys.map(key =>{
                    const product = fakeData.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product
                })
            setCart(cartProducts)
        },[]);
        
    return (
        <div className ="shop-container">
            <div className ="product-container">
            <h1> Total ordered Products  : {cart.length}</h1>
            {
                cart.map(pd => <ReviewItems removeItem = {removeItem} key = 
                    {pd.key} product = {pd}></ReviewItems>)
            }
            </div>
            <div className = "cart-container">
                <Cart cart = {cart}>
                    <button onClick={handleProceed} className = "review-button">Proceed Checkout</button>
                    </Cart>
            </div>
        </div>
    );
};

export default Review;