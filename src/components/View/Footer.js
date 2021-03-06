import React from 'react';
import '../../assets/scss/footer.scss';

const Footer = () => (
  <div className="main-footer">
    <p>Groupeé <sup>&copy;</sup> 2017 - {(new Date()).getFullYear()}</p>
    <ul>
      <li><a href="">About</a></li>
      <li><a href="">FAQ</a></li>
      <li><a href="">Terms</a></li>
      <li><a href="">Support</a></li>
      <li><a href="">Contact</a></li>
    </ul>
  </div>
);

export default Footer;
