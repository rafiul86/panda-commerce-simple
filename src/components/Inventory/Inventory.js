import React from 'react';
import fakeData from '../../fakeData';


const Inventory = () => {
    const handleProducts = () =>{
        fetch('http://localhost:https://damp-sands-03013.herokuapp.com/addProducts',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(fakeData)
        })
        .then(result => result.json())
        .then(data =>{
            // console.log(data)
        })
    }
    return (
        <div>
           <h1>This is inventory</h1>
           <button onClick={handleProducts}>Add Product</button> 
        </div>
    );
};

export default Inventory;