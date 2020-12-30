import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BuildIcon from '@material-ui/icons/Build';

import myIcon from '../Webp.net-resizeimage.png';

export default function Navbar() {
  const [showLinks, setShowLink] = useState(false);
  // const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  let linksHeight = useRef(0);

  let t1, t2;
  const stopTimeOut = () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };

  //prisposobi sa velkost podla poctu linkov
  useEffect(() => {
    // const linksHeight = linksRef.current.getBoundingClientRect().height;
    //  linksHeight;
    if (showLinks) {
      linksHeight.current =
        document.querySelectorAll('.show-container > li').length * 34;
      linksRef.current.style.height = `${linksHeight.current}px`;
      linksRef.current.style.position = `inherit`;
    } else {
      if (linksHeight.current > 0) {
        t1 = setTimeout(() => {
          t2 = setTimeout(() => {
            if (!showLinks) {
              linksRef.current.style.height = `0px`;
              linksRef.current.style.position = `absolute`;
            } else {
              //ak rychlo stlacim tak showlinks == true ale dobehne timer a nastavi na nulu preto ak sa to stane musim pozriet ci je ozaj false
              linksHeight.current =
                document.querySelectorAll('.show-container > li').length * 34;
              linksRef.current.style.height = `${linksHeight.current}px`;
              linksRef.current.style.position = `inherit`;
            }
          }, 350);
          linksRef.current.style.height = `${linksHeight.current / 20}px`;
        }, 250);

        linksRef.current.style.height = `${linksHeight.current / 3}px`;
      } else {
        linksRef.current.style.position = `absolute`;
      }
    }
  }, [showLinks]);

  // ====RENDER ====
  return (
    <AppBar position='static' elevation={24}>
      <Toolbar className='ahoj nav-center'>
        <Link to='/'>
          <img src={myIcon} alt='logo' />
        </Link>
        <button
          className='nav-toggle'
          onClick={() => {
            setShowLink(!showLinks);
            stopTimeOut();
          }}>
          <MenuIcon />
        </button>
        <Links1 />
        <Links2 />
      </Toolbar>
      {/* {<ColumnLinks showLinks linksRef></ColumnLinks>} */}
      <ul className={`nav-links show-container`} ref={linksRef}>
        <li>
          <Link to='/'>
            <HomeIcon />
            home
          </Link>
        </li>
        <li>
          <Link to='/vypozicky'>
            <DriveEtaIcon />
            vypozicky
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <InfoOutlinedIcon />
            about
          </Link>
        </li>
        <li>
          <Link to='/dummy'>
            <BuildIcon />
            dummy
          </Link>
        </li>
        <li>
          <Link to='/dummy'>dummy</Link>
        </li>
        <li>
          <span>
            <Link to='/profil'>
              <AccountCircle />
            </Link>

            <Link to='/'>
              <ExitToAppIcon />
            </Link>
          </span>
        </li>
      </ul>
      {/* {showLinks && <Links1 showLinks cssShow={'show-container'}></Links1>} */}
    </AppBar>
  );
}

const Links1 = ({ cssShow }) => {
  return (
    <ul className={`nav-links `}>
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
  );
};

const Links2 = ({ cssShow }) => {
  return (
    <ul className={`nav-links `}>
      <li>
        <Link to='/dummy'>dummy</Link>
      </li>
      <li>
        <Link to='/dummy'>dummy</Link>
      </li>
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
  );
};

const ColumnLinks = (props) => {
  const { linksRef } = props;
  console.log('links ref', linksRef);
  return (
    <div>
      {/* <Links1 cssShow={'show-container'} />
      <Links2 cssShow={'show-container'} /> */}
      <ul className={`nav-links show-container`} ref={linksRef}>
        <li>
          <Link to='/'>
            <HomeIcon />
            home
          </Link>
        </li>
        <li>
          <Link to='/vypozicky'>
            <DriveEtaIcon />
            vypozicky
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <InfoOutlinedIcon />
            about
          </Link>
        </li>
        <li>
          <Link to='/dummy'>
            <BuildIcon />
            dummy
          </Link>
        </li>
        <li>
          <Link to='/dummy'>dummy</Link>
        </li>
        <li>
          <span>
            <Link to='/profil'>
              <AccountCircle />
            </Link>

            <Link to='/'>
              <ExitToAppIcon />
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
