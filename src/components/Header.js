import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import logout from '../img/logout.png';
import ReactTooltip from 'react-tooltip';

class Header extends React.Component {

    render() {
        return (
            <div className="p-2 row justify-content-between my-auto">
                <Link to="/" className="pl-2" data-tip data-for="homeTip">
                    <img src={logo} height="64" alt="logo" />
                </Link>

                <ReactTooltip
                    id="homeTip"
                    place="bottom"
                    effect="solid"
                >
                    Go to home
                </ReactTooltip>

                <ReactTooltip
                    id="logoutTip"
                    place="bottom"
                    effect="solid"
                >
                    Logout
                </ReactTooltip>

                <Link to="/logout" className="my-auto" data-tip data-for="logoutTip">
                    <img src={logout} height="32" alt="logout" className="text-center" />
                </Link>
            </div>
        );
    }
}

export default Header;