import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

import myIcon from '../Webp.net-resizeimage.png';

export default function Navbar() {
  const [showLinks, setShowLink] = useState(false);
  const navLink_1_Ref = useRef(null);
  const navLink_2_Ref = useRef(null);

  //prisposobi sa velkost podla poctu linkov
  // useEffect(() => {
  //   const navLinkHeight = navLink_1_Ref.current.getBoundingClientRect().height;
  //   if (showLinks) {
  //     navLink_1_Ref.current.style.height = `${navLinkHeight}px`;
  //   } else {
  //     navLink_1_Ref.current.style.height = '0px';
  //   }
  // }, [showLinks]);

  return (
    <AppBar position='static'>
      <Toolbar className='ahoj nav-center'>
        <Link to='/'>
          <img src={myIcon} alt='logo' />
        </Link>
        <button className='nav-toggle' onClick={() => setShowLink(!showLinks)}>
          <MenuIcon />
        </button>

        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/vypozicky'>vypozicky</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
        </ul>

        <ul className='nav-links'>
          {true && (
            <>
              <li>
                <Link to='/dummy'>dummy</Link>
              </li>
              <li>
                <Link to='/dummy'>dummy</Link>
              </li>
            </>
          )}

          <li>
            <Link to='/profil'>
              <AccountCircle />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <ExitToAppIcon />
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}
