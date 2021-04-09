import React from 'react';
import './ReviewItems.css'

const ReviewItems = (props) => {
    const {name,quantity,price,key} = props.product ;
    return (
      <div className = "final-review">
          <h4>Price : {price}</h4>
          <h4> Product : {name}</h4>
          <h4>Ordered : {quantity}</h4>
          <br/>
          <button className = "btn-add"
          onClick = {()=> props.removeItem(key)}
          >Remove</button>
      </div>
    );
};

export default ReviewItems;