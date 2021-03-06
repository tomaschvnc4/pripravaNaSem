import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
//icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
//moje
import myIcon from '../Webp.net-resizeimage.png';
import MyDialog from './MyDialog';
import { useGlobalContext } from '../context';

const Navbar = () => {
   const [showLinks, setShowLink] = useState(false);
   const linksRef = useRef(null);
   let linksHeight = useRef(0);

   const {
      isLogin,
      isOpenDialogLogOut,
      fetchVypozicky,
      handleDialogLogOut,
      odhlasenie,
   } = useGlobalContext();

   let t1, t2;
   const stopTimeOut = () => {
      clearTimeout(t1);
      clearTimeout(t2);
   };

   //prisposobi sa velkost podla poctu linkov
   useEffect(() => {
      if (showLinks) {
         linksHeight.current = document.querySelectorAll('.show-container > li').length * 34;
         linksRef.current.style.height = `${linksHeight.current}px`;
         linksRef.current.style.position = `inherit`;
      } else {
         if (linksHeight.current > 0) {
            t1 = setTimeout(() => {
               t2 = setTimeout(() => {
                  linksRef.current.style.height = `0px`;
                  linksRef.current.style.position = `absolute`;
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
      <>
         <MyDialog
            title='Odhlásenie prebehlo úspešne.'
            text='Dovidenia!'
            open={isOpenDialogLogOut}
            handleDialog={handleDialogLogOut}
         />
         <Grid container justify='center'>
            <Grid item xs={12} sm={10}>
               <AppBar position='static' elevation={24} style={{ borderRadius: '15px' }}>
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
                     {isLogin && <Links2 />}
                  </Toolbar>

                  <ul className={`nav-links show-container`} ref={linksRef}>
                     <li>
                        <Link to='/'>
                           <HomeIcon />
                           home
                        </Link>
                     </li>
                     <li>
                        {isLogin ? (
                           <Link to='/vypozicky' onClick={() => fetchVypozicky()}>
                              výpožičky
                           </Link>
                        ) : (
                           <Link to='/login'>login/register</Link>
                        )}
                     </li>
                     <li>
                        <Link to='/about'>
                           <InfoOutlinedIcon />o nás
                        </Link>
                     </li>
                     {isLogin && (
                        <>
                           <li>
                              <span>
                                 <Link to='/profil'>
                                    <AccountCircle />
                                 </Link>

                                 <Link to='/'>
                                    <ExitToAppIcon onClick={() => odhlasenie()} />
                                 </Link>
                              </span>
                           </li>
                        </>
                     )}
                  </ul>
               </AppBar>
            </Grid>
         </Grid>
      </>
   );
};

export default Navbar;

const Links1 = () => {
   const { isLogin, fetchVypozicky } = useGlobalContext();
   return (
      <ul className={`nav-links `}>
         <li>
            <Link to='/'>home</Link>
         </li>
         <li>
            {isLogin ? (
               <Link to='/vypozicky' onClick={() => fetchVypozicky()}>
                  výpožičky
               </Link>
            ) : (
               <Link to='/login'>login/register</Link>
            )}
         </li>
         <li>
            <Link to='/about'>o nás</Link>
         </li>
      </ul>
   );
};

const Links2 = () => {
   const { fetchVypozicky, odhlasenie } = useGlobalContext();
   return (
      <ul className={`nav-links `}>
         <li>
            <Link to='/profil'>
               <AccountCircle />
            </Link>
         </li>
         <li>
            <Link to='/'>
               <ExitToAppIcon onClick={() => odhlasenie()} />
            </Link>
         </li>
      </ul>
   );
};
