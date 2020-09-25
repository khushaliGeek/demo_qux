import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import logout from '../img/logout.png';
import ReactTooltip from 'react-tooltip';
import Sidebar from 'react-bootstrap-sidebar';
import { Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    updateModal(inVisible) {
        this.setState({ inVisible });
        this.forceUpdate();
    }

    render() {
        return (
            <div className="p-2 row justify-content-between my-auto">
                {/* <Link to="/" className="pl-2" data-tip data-for="homeTip"> */}
                    <img src={logo} className="pl-2" height="64" alt="logo" onClick={this.updateModal(true)} />
                {/* </Link> */}

                <ReactTooltip
                    id="homeTip"
                    place="bottom"
                    effect="solid"
                >
                    Go to home
                </ReactTooltip>

                <Sidebar side='left' isVisible={this.state.flag} onHide={() => this.updateModal(false)}>
                    <Nav>
                        <NavItem href="#">Link 1</NavItem>
                        <NavItem href="#">Link 2</NavItem>
                        <NavItem href="#">Link 3</NavItem>
                        <NavItem href="#">Link 4</NavItem>
                    </Nav>
                </Sidebar>

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