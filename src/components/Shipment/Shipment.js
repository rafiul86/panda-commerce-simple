import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import shipment from './Shipment.css';
import {CardElement} from '@stripe/react-stripe-js';
import PaymentProcess from '../PaymentProcess/PaymentProcess';




 export const GlobalContext = createContext()
const Shipment = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData , setShippingData] = useState(null)
  const onSubmit = data => {
    setShippingData(data)
  }
  const handleOrderData = paymentId =>{
    const savedCart = getDatabaseCart()
    const orderInfo = {...loggedInUser, 
      customerInfo : shippingData ,
      productInfo : savedCart,
      paymentId
     }
    fetch('http://localhost:5000/addOrders',{
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(orderInfo)
    })
  }
  return (
    <GlobalContext.Provider value={handleOrderData}>
    <div className="row" >
      <div className="col-md-6" style={{display : shippingData ? 'none' : 'block'}}>   <form className ="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="title"  placeholder="title"  ref={register} />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      <input name="name" placeholder="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
      {errors.name && <span className="error">This field is required</span>}
      <input name="address" defaultValue={loggedInUser.address} placeholder="address line 1" ref={register({ required: true })} />
      {errors.address && <span className="error">This field is required</span>}
      <input name="address" placeholder="address line 2" ref={register({ required: true })} />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      <input name="country" placeholder="country" ref={register({ required: true })} />
      {errors.country && <span className="error">This field is required</span>}
      <input name="zip code" placeholder="zip code" ref={register({ required: true })} />
      {errors.zipcode && <span className="error">This field is required</span>}
      <input name="email" defaultValue={loggedInUser.email} placeholder="email" ref={register({ required: true })} />
      {errors.email && <span className="error">This field is required</span>}
      <input type="submit" />
    </form></div>
      <div className="col-md-3  text-primary mt-5" style={{display : shippingData ? 'block' : 'none'}}>
       
        <h3>VISA/MasterCard Accepted</h3>
        <PaymentProcess></PaymentProcess>
      </div>
    </div>
    </GlobalContext.Provider>
  );
};

export default Shipment;