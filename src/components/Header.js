import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron, 
  Container
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import './Header.css';
import logoText from '../ARG-logo-text.png';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
            <img className="" src={logoText} height="200"/>
          </div>
        </Container>
      </Jumbotron> 
      <Navbar light expand="md" id="navbar">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-links" to={`${process.env.PUBLIC_URL}/`}>Home</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-links" to={`${process.env.PUBLIC_URL}/about`}>About</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-links" to={`${process.env.PUBLIC_URL}/products/basket`}>Basket</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;