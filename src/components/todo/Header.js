import React from 'react'
import {Link} from '../router'

export const Header = () => {
    return (
        <nav className="nav">
            <Link className="nav__item" to='/'>All</Link>
            <Link className="nav__item" to='/active'>Active</Link>
            <Link className="nav__item" to='/complete'>Complete</Link>
        </nav>
    )
}