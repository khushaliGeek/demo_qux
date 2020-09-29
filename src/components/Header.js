import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
// import logout from '../img/logout.png';
import ReactTooltip from 'react-tooltip';
import { Nav, Navbar } from 'react-bootstrap';
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    render() {
        return (
            <div className="">
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} height="64" alt="logo" data-tip data-for="homeTip" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/portalGenerator" >
                                Portal Generator
                            </Nav.Link>
                            <Nav.Link as={Link} to="/myportals">
                                My Portals
                            </Nav.Link>
                            <Nav.Link as={Link} to="/logout">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <ReactTooltip
                    id="logoutTip"
                    place="bottom"
                    effect="solid"
                >
                    Logout
                </ReactTooltip>
                {/* <Link to="/" className="pl-2">
                    <img src={logo} className="pl-2" height="64" alt="logo" data-tip data-for="homeTip" />
                </Link>

                <a href="/portalGenerator" className="pl-2 my-auto">
                    Portal Generator
                </a>

                <Link to="/myportals" className="pl-2 my-auto">
                    My Portals
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
                </Link> */}
            </div>
        );
    }
}

export default Header;