import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";

const Header = props => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // Existing Account Menu
    const existingAccount = () => {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{props.accountName}</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={props.logoutAccountHandler}>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
    
    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------   
    return (
        <div>
            <Navbar color="light" light expand="md">
                <div className="container">
                    <NavbarBrand href="/"><strong>Quizzler</strong></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>
                                    <Link to="/start">New Quiz</Link>
                                </NavLink>
                            </NavItem>
                            {props.isAuth ?
                                <NavItem>
                                    <NavLink>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </NavLink>
                                </NavItem>
                            : ''}
                            
                            {props.isAuth ? existingAccount() : ''}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    )
}

// Map States from Redux to component props
const mapStateToProps = state => {
    return {
        accountName: state.auth_reducer.accountName,
        isAuth: state.auth_reducer.isAuth,
    };
};

// Map Dispatch From Redux to component props
const mapDispatchToProps = dispatch => {
    return {
        logoutAccountHandler: () => dispatch({ type: 'Logout_Account'}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);