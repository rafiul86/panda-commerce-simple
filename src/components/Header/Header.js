import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo}alt=""/>
            <nav>
                        <Link to="/Shop">SHOP</Link>
                        <Link to="/Review">REVIEW</Link>
                        <Link to="/Inventory">MANAGE ORDER</Link>
                        <button onClick = {()=>setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;