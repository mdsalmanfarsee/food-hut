import React from 'react';
import './Header.css'


const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your favourite  food here</h2>
                <p>Enjoy a wide variety of cuisines delivered straight to your doorstep with just a few clicks.</p>
                <button><a href="#explore-menu">view menu</a></button>
            </div>
        </div>
    )
}

export default Header;