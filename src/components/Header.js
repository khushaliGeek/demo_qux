import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import logout from '../img/logout.png';
import ReactTooltip from 'react-tooltip';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    

    render() {
        return (
            <div className="p-2 row justify-content-between my-auto">
                <Link to="/" className="pl-2">
                    <img src={logo} className="pl-2" height="64" alt="logo" data-tip data-for="homeTip" />
                </Link>

                <Link to="/" className="pl-2 my-auto">
                    Portal Generator
                </Link>

                <Link to="/" className="pl-2 my-auto">
                    My Portals
                </Link>

                {/* <SideNav
                    onSelect={(selected) => {
                        // Add your code here
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                            <NavItem eventKey="charts/linechart">
                                <NavText>
                                    Line Chart
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="charts/barchart">
                                <NavText>
                                    Bar Chart
                                </NavText>
                            </NavItem>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav> */}
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