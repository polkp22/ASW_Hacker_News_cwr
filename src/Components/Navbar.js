import React from 'react';
import { Link } from 'react-router-dom';

const Navbar=()=>{
    return(
         <nav className='navbar'>
            <ul>
                <li><Link to="/" className="nav-link">NEWS</Link></li>
                <li><Link to="/threads" className="nav-link">THREADS</Link></li>
                <li><Link to="/submissions" className="nav-link">MY SUBMISSIONS</Link></li>
                <li><Link to="/comments" className="nav-link">MY COMMENTS</Link></li>
                <li><Link to="/upvotedSubmissions" className="nav-link">MY UPVOTED SUBMISSIONS</Link></li>
                <li><Link to="/upvotedComments" className="nav-link">MY UPVOTED COMMENTS</Link></li>
                <li><Link to="/submissionListItem" className="nav-link">Testing submission items</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;