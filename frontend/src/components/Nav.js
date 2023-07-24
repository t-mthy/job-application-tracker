import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    // "../" leaves components folder, and ref App.js <Route>
    return (
        <nav className="mainNav">
            <Link to="/">About</Link>
            <Link to="../log">Job Tracker</Link>
        </nav>
    );
}

export default Nav;
