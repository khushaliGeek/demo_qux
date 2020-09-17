import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

class Header extends React.Component {

    render() {
        return (
            <div className="p-2">
                <Link to="/">
                    <img src={logo} height="64" alt="logo" />
                </Link>
            </div>
        );
    }
}

export default Header;