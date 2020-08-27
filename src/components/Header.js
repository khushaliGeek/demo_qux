import React from 'react';
import logo from '../img/logo.png';

class Header extends React.Component {

    render() {
        return (
            <div className="p-2">
                <img src={logo} height="64" alt="logo" />
            </div>
        );
    }
}

export default Header;