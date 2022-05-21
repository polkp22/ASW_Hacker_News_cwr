import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css'
import {FaReact} from 'react-icons/fa';
import {MdOutlineForum, MdOutlineArrowForwardIos} from 'react-icons/md';
import {RiHomeLine, RiMenuFill, RiChatHeartLine, RiHeart3Line, RiChat4Line, RiLogoutBoxLine} from 'react-icons/ri';

class Navbar extends Component {
    
    handleBtnClick = () => {
        let sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.toggle("active");

    }

    render() {
        return(
            <div className='sidebar'>
                <div className='logo_content'>
                    <div className='logo'>
                        <FaReact/>
                        <div className='logo_name'>
                            HackerNews
                        </div>
                    </div>
                </div>
                <MdOutlineArrowForwardIos name='menu' id="btn" onClick={this.handleBtnClick}/>
                <ul className='nav_list'>
                    <li>
                        <Link to='/'>
                        <RiHomeLine />
                            <span className='links_name'>News</span>
                        </Link>
                        <span className='tooltip'>News</span>
                    </li>
                    <li>
                        <Link to='/threads'>
                        <MdOutlineForum />
                            <span className='links_name'>Threads</span>
                        </Link>
                        <span className='tooltip'>Threads</span>
                    </li>
                    <li>
                        <Link to='/submissions'>
                        <RiMenuFill />
                            <span className='links_name'>My Submissions</span>
                        </Link>
                        <span className='tooltip'>My Submissions</span>
                    </li>
                    <li>
                        <Link to='/comments'>
                        <RiChat4Line />
                            <span className='links_name'>My Comments</span>
                        </Link>
                        <span className='tooltip'>My Comments</span>
                    </li>
                    <li>
                        <Link to='/upvotedSubmissions'>
                        <RiHeart3Line />
                            <span className='links_name'>My Upvoted Submissions</span>
                        </Link>
                        <span className='tooltip tooltipxxl'>My Upvoted Submissions</span>
                    </li>
                    <li>
                        <Link to='/upvotedComments'>
                        <RiChatHeartLine />
                            <span className='links_name'>My Upvoted Comments</span>
                        </Link>
                        <span className='tooltip tooltipxxl'>My Upvoted Comments</span>
                    </li>
                </ul>
                <div className='profile_content'>
                    <div className='profile'>
                        <div className='profile_details'>
                            <img src="https://avatars.githubusercontent.com/u/87144040?v=4" alt=""/>
                            <div className='name'>
                                Example User
                            </div>
                        </div>
                        <RiLogoutBoxLine id="log_out" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;