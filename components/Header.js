import React from 'react';
import headerStyles from '../styles/Header.module.css'

const Header = () => {
    return (
        <div className={headerStyles.title}>
            <h1><span>WEB3</span> Articles</h1>
            <p className={headerStyles.description}>Publish & read Web3 articles!</p>
        </div>
    );
};

export default Header;
