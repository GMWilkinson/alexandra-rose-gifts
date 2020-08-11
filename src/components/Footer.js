import React, { useState } from 'react';
import './Footer.css';
import logo from '../ARG-logo.png';

const Footer = (props) => {

  return (
    <footer style={{display: 'flex'}}>
        <div>
            <img src={logo} height="100"/>
        </div>
    </footer>
  );
}

export default Footer;