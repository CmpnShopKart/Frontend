import React from 'react';
import './NavMenu.scss';

const NavMenu = (props) => {
    return(
        <div className='nav-menu-container'>
            <ul className='nav-menu-container__list'>
                <li className='nav-menu-container__list__item' onClick={() => props.history.push('/buyer/home')}>Home</li>
                <li className='nav-menu-container__list__item' onClick={() => props.history.push('/buyer/cart')}>Cart</li>
                <li className='nav-menu-container__list__item' onClick={() => props.history.push('/buyer/orders')}>Orders</li>
                <li className='nav-menu-container__list__item' onClick={() => props.history.push('/')}>Log Out</li>
            </ul>
        </div>
    )
}

export default NavMenu;