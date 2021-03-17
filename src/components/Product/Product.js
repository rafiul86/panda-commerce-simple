import './Product.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const {name, price, stock, seller, img, key} = props.product;
    const handleProduct = props.handleProduct ;

    return (
        <div className = "pd-container">
            <div className = "image-container">
                <img src={img} alt=""/>
            </div>
            <div className = "item-container">
                <h3><Link to ={"/product/"+key}>{name}</Link> </h3>
                
                <h4>{seller}</h4>
                
                <p><small>${price}</small></p>
                
                <p>There are {stock} piece  only in stock ! Order Now !!</p>
                {props.showAddToCart === true && <button className = "btn-add" onClick = {()=> handleProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>   <FontAwesomeIcon icon={faTags}/>   Add to Cart </button>}

            </div>
        </div>
    );
};

export default Product;