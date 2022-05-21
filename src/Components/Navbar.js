import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css'
import {BiMenu} from 'react-icons/bi';
const Navbar=()=>{
    return(
        <div className='sidebar'>
            <div className='logo_content'>
                <div className='logo'>
                    <box-icon type='logo' name='react'></box-icon>
                    <div className='logo_name'>
                        Hacker News
                    </div>
                </div>
                <box-icon name='menu' id="btn" ></box-icon>
            </div>
            <ul className='nav_list'>
                <li>
                    <Link to='/'>
                    {BiMenu}
                        <span className='links_name'>Dashboard</span>
                    </Link>
                    {/* <span className='tooltip'>Dashboard</span> */}
                </li>
                <li>
                    <Link to='/'>
                        <box-icon name='grid-alt' ></box-icon>
                        <span className='links_name'>Dashboard</span>
                    </Link>
                    {/* <span className='tooltip'>Dashboard</span> */}
                </li>
                <li>
                    <Link to='/'>
                        <box-icon name='grid-alt' ></box-icon>
                        <span className='links_name'>Dashboard</span>
                    </Link>
                    {/* <span className='tooltip'>Dashboard</span> */}
                </li>
                <li>
                    <Link to='/'>
                        <box-icon name='grid-alt' ></box-icon>
                        <span className='links_name'>Dashboard</span>
                    </Link>
                    {/* <span className='tooltip'>Dashboard</span> */}
                </li>
                <li>
                    <Link to='/'>
                        <box-icon name='grid-alt' ></box-icon>
                        <span className='links_name'>Dashboard</span>
                    </Link>
                    {/* <span className='tooltip'>Dashboard</span> */}
                </li>
            </ul>
        </div>
    )
}

export default Navbar;