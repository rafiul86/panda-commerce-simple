import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'


const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [search ,setSearch] = useState('')
    useEffect(()=>{
        fetch('http://localhost:5000/products?search='+search)
        .then(res =>res.json())
        .then(data =>setProducts(data))
    },[search])
        useEffect(()=>{
         const savedCart = getDatabaseCart()
            console.log(savedCart)
            const productKeys = Object.keys(savedCart);
         if(products.length > 0){
            const  previousCart = productKeys.map(existingKey => {
                const product = products.find(pd  => pd.key === existingKey)
              product.quantity = savedCart[existingKey];
              return product
            })
            setCart(previousCart)
         }
        },[products])

    const handleProduct = (product) => {
        const toBeAddedKey = product.key ;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart ;
        if(sameProduct){
            count = sameProduct.quantity + 1 ;
            sameProduct.quantity = count ;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1 ;
            newCart = [...cart ,product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count)
    }
const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
}
        return (
        <div className = "shop-container">
            <div className = "product-container">
                <input type="text" onBlur={handleSearch}/>
                {
                    products.map(product => <Product showAddToCart = {true}
                      key = {product.key}  handleProduct = {handleProduct} product = {product}></Product>)
                }
            </div>
                <div className = "cart-container">
                   <Cart cart = {cart}>
                       <Link to = "/Review">
                       <button className = "btn-add">Review Order</button>
                       </Link>
                       </Cart>
                </div>
        </div>
    );
};

export default Shop;