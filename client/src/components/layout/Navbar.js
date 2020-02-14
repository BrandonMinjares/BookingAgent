import React from 'react'
import { NavLink, Link } from 'react-router-dom'

// this would be functional componenet because it's only
// returning data and not changing anything
// functioal component = stateless component

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to ='/register'>Register</NavLink></li>               
                <li><Link to ='/login'>Login</Link></li>
                <li><Link to ='/dashboard'>Dashboard</Link></li>
                <li><Link to ='/contact'>Contact</Link></li>

            </ul>
        </nav>
    )
}

export default Navbar