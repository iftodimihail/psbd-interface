import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';
import logo from "../../image/logo.svg";
import logoIcon from "../../image/logo-icon.svg";

// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ?
          <h3>
            <Link to="/dashboard/">
              <img src={logoIcon} alt='Chur' className="isoSidebarLogoIcon"/>
            </Link>
          </h3>
        : <h3>
            <Link to="/dashboard/">
              <img src={logo} alt='Chur' className="isoSidebarLogo"/>
            </Link>
          </h3>}
    </div>
  );
}
