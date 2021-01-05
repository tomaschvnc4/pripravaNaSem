import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// ==KONTEXT
import { useGlobalContext } from '../context';
import { Button, Paper, Typography } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const Info = ({ id, typ }) => {
  const classes = useStyles();
  const { dataCars, user } = useGlobalContext();
  let specificItem = {};
  let keys = [];

  if (id) {
    if (typ === 'car') {
      specificItem = dataCars.find((car) => car.id === id);
      keys = Object.keys(keysPopisAuto);
    } else if (typ === 'user') {
      specificItem = { ...user };
      keys = Object.keys(keysPopisUser);
    }
  }
  //  const{farba,palivo,vykon, znamka} = specificCAr
  return (
    <aside className='sigle-car-component'>
      <Paper className={classes.root}>
        {keys.map((key, index) => {
          return (
            <span className={classes.carAtribuut} key={`${specificItem.id} ${index}`}>
              <Button color='primary' component='h3'>
                {keysPopisAuto[key]}
                {keysPopisUser[key]}
              </Button>
              <Typography variant='subtitle2' component='h3'>
                {specificItem[key]}
              </Typography>
            </span>
          );
        })}

        {typ === 'car' && (
          <span className={classes.carAtribuut}>
            <Button color='primary' component='h3'>
              Dialničná známka:
            </Button>

            <Typography variant='subtitle2' component='h3'>
              {!!specificItem.znamka ? (
                <img src='https://img.icons8.com/ios-glyphs/30/000000/highway--v2.png' />
              ) : (
                <HighlightOffOutlinedIcon color='error' />
              )}
            </Typography>
          </span>
        )}

        {/* =======VYPIS BY MAP */}

        {/* <div key={specificCar.id}>
          {keys.map((key, index) => {
            return (
              <span className={classes.carAtribuut} key={`${specificCar.id} ${index}`}>
                <Typography gutterBottom variant='subtitle1' component='h2'>
                  {keysPopis[key]}
                </Typography>
                <Typography variant='subtitle2' component='h2'>
                  {specificCar[key]}
                </Typography>
              </span>
            );
          })}
        </div> */}
      </Paper>
    </aside>
  );
};

export default Info;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5rem',
    '&:hover': {
      backgroundColor: '#e8f7fe',
    },
  },
  carAtribuut: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h3': {
      letterSpacing: '0.1rem',
      cursor: 'unset',
      paddingLeft: 1,
    },
  },
}));

const keysPopisAuto = {
  //id: 'id',
  farba: 'Farba:',
  palivo: 'Palivo:',
  vykon: 'Výkon:',
  spotreba: 'Spotreba:',
  // znamka: 'Dialničná známka',
  //vybava: 'Výbava',
};

const keysPopisUser = {
  // id: 'ID:',
  meno: 'Meno:',
  username: 'Login:',
  email: 'Email:',
  telefon: 'Tel.číslo:',
  kredit: 'Kredit:', //moc neriesit iba ak na konci
};
