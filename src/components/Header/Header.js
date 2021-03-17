import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <img src={logo}alt=""/>
            <nav>
                        <Link to="/Shop">SHOP</Link>
                        <Link to="/Review">REVIEW</Link>
                        <Link to="/Inventory">MANAGE ORDER</Link>
            </nav>
        </div>
    );
};

export default Header;