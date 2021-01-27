import React from 'react';
import './header.css';

const Header = () => (
    <header id="main-header">
        <a href="/" className="menu-first">Menu 1</a>
        <ul className="menu-top">
            <li><a href="/"><i className="fa fa-align-justify"></i></a></li>
            <li><a href="/query"><i className="fa fa-terminal"></i></a></li>
        </ul>
    </header>
);

export default Header;
