import React, { useState } from 'react';
import moment from 'moment';
import CarInfo from './Info';
import MyDialog from './MyDialog';
import Axios from 'axios';

//MUI
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
   Typography,
   Card,
   CardMedia,
   CardContent,
   CardActions,
   IconButton,
   Button,
   Collapse,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { green } from '@material-ui/core/colors';

// ==KONTEXT
import { useGlobalContext } from '../context';

const Car = (props) => {
   const classes = useStyles();
   const [expanded, setExpanded] = useState(false);
   const [citatViac, setCitatViac] = useState(false);

   const {
      serverPath,
      // handleDialogCar,
      // isOpenDialogCar,
      isAdmin,
      handleAdd_edit_car,
      handleIsFetchData,
      user,
      isLogin,
      isOpenDialogPotvrd,
      handleDialogPotvrd,
      deleteCar,
   } = useGlobalContext();

   const { id: id_auto, image, model, cena, znacka, spz, popis, pozicane } = props;
   const { id: id_zakaznik } = user;
   let imgPath = serverPath + image.slice(8);

   const pozicatAuto = async (id_auto) => {
      // const time = moment.now();
      const d_rezervacie = moment.now();
      console.log(d_rezervacie);

      const newVypozicka = { id_auto, id_zakaznik, d_rezervacie };
      const response = await Axios.post('http://localhost:3001/vypozicka/add', {
         ...newVypozicka,
      });
      console.log(response.data);
   };
   const onClickPozicat = () => {
      pozicatAuto(id_auto);
      handleIsFetchData();
   };

   //==RETURN
   return (
      <article className={classes._rootContainer}>
         <Card className={classes._main} component='main'>
            {/* <MyDialog
          // props -- len pre info
          component={CarInfo}
          title='BA555XX'
          handleDialog={handleDialogCar}
          open={isOpenDialogCar}
          id={id_auto}
        /> */}
            <MyDialog
               title='Pozor'
               text='Chystáte sa odstrániť toto auto!'
               btnText='Potvrď'
               btnFunction={deleteCar}
               open={isOpenDialogPotvrd}
               handleDialog={handleDialogPotvrd}
               id={id_auto}
            />
            <div>
               <div className='display-row'>
                  <CardMedia
                     component='img'
                     className={classes.mymedia}
                     image={imgPath}
                     height='auto'
                     title='Contemplative Reptile'
                  />
                  <CardContent>
                     <div className={classes.title}>
                        <Typography variant='h5' component='h2'>
                           {model}
                        </Typography>
                        <Typography variant='h6' component='h6' color='primary'>
                           ...{cena}€/deň
                        </Typography>
                     </div>
                     <div className={classes._subtitle}>
                        <Typography gutterBottom variant='subtitle1' component='h2'>
                           {znacka}
                        </Typography>
                        <Typography variant='subtitle2' component='h2'>
                           {spz}
                        </Typography>
                     </div>
                     <Typography
                        variant='body2'
                        color='textPrimary'
                        component='p'
                        className='Citat-viac'>
                        {citatViac ? popis : `${popis.substring(0, 200)}...`}
                        <button onClick={() => setCitatViac(!citatViac)}>
                           {citatViac ? ' menej' : ' viac'}
                        </button>
                     </Typography>
                  </CardContent>
               </div>

               <CardActions className={classes._actionBar}>
                  <div>
                     {isAdmin && (
                        <>
                           <IconButton
                              size='small'
                              color='primary'
                              onClick={() => handleAdd_edit_car(true, id_auto)}>
                              <CreateIcon />
                           </IconButton>
                           {!pozicane && (
                              <IconButton
                                 aria-label='delete'
                                 color='secondary'
                                 // onClick={() => deleteCar(id_auto)}>
                                 onClick={() => handleDialogPotvrd()}>
                                 <DeleteIcon />
                              </IconButton>
                           )}
                        </>
                     )}

                     <Button
                        size='small'
                        color='primary'
                        onClick={() => setExpanded(!expanded)}
                        // onClick={() => handleDialogCar()}
                        aria-expanded={expanded}>
                        Viac info
                     </Button>
                  </div>
                  <div className={classes._disableButton}>
                     <ThemeProvider theme={themeGreen}>
                        <Button
                           size='small'
                           variant='outlined'
                           color='primary'
                           disabled={isLogin ? (pozicane ? true : false) : true}
                           onClick={() => onClickPozicat()}
                           // disabled
                        >
                           <p>
                              Požičať <small>{!isLogin && '(po prihlásení)'}</small>
                           </p>
                        </Button>
                     </ThemeProvider>
                  </div>
               </CardActions>
            </div>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
               <CardContent>
                  <CarInfo id={id_auto} typ={'car'} />
               </CardContent>
            </Collapse>
         </Card>
      </article>
   );
};

export default Car;

//MUI-Styles
const useStyles = makeStyles((theme) => ({
   _rootContainer: {
      display: 'flex',
      justifyContent: 'center',
   },

   _main: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      // maxWidth: 345,
      maxWidth: '95%',

      boxShadow: theme.shadows[5],
      '&:hover': {
         boxShadow: theme.shadows[24],
      },
   },

   mymedia: {
      width: 'auto',
      padding: 20,
   },

   title: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '.5px dotted #617d98',
      '& h6': {
         display: 'flex',
         alignItems: 'flex-end',
      },
   },

   _subtitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& h2': {
         opacity: 0.6,
      },
   },

   _actionBar: {
      display: 'flex',
      justifyContent: 'space-between',

      '& .btn-pozicat': {
         marginRight: '10px',
      },
      '& .Mui-disabled': {
         color: ' #e53935',
         border: '1px solid #e53935',
      },
   },
}));

const themeGreen = createMuiTheme({
   palette: {
      primary: green,
   },
});
