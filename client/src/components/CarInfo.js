import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// ==KONTEXT
import { useGlobalContext } from '../context';
import { Button, Paper, Typography } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const SingleCar = () => {
  const classes = useStyles();
  // const {  } = useGlobalContext();
  return (
    <aside className='sigle-car-component'>
      <Paper className={classes.root}>
        <span className={classes.carAtribuut}>
          <Button color='primary' component='h2'>
            Farba:
          </Button>
          <Typography variant='subtitle2' component='h3'>
            Zelena
          </Typography>
        </span>
        <span className={classes.carAtribuut}>
          <Button color='primary' component='h2'>
            Palivo:
          </Button>
          <Typography variant='subtitle2' component='h3'>
            LPG
          </Typography>
        </span>
        <span className={classes.carAtribuut}>
          <Button color='primary' component='h2'>
            Výkon:
          </Button>
          <Typography variant='subtitle2' component='h3'>
            88Kw
          </Typography>
        </span>
        <span className={classes.carAtribuut}>
          <Button color='primary' component='h2'>
            Dialničná známka:
          </Button>

          <Typography variant='subtitle2' component='h3'>
            {false ? (
              <img src='https://img.icons8.com/ios-glyphs/30/000000/highway--v2.png' />
            ) : (
              <HighlightOffOutlinedIcon color='error' />
            )}
          </Typography>
        </span>

        {/* =======VYPIS BY MAP */}
        {/* {testData.map((auto) => {
          const keys = Object.keys(keysPopis);
          return (
            <div key={auto.id}>
              {keys.map((key, index) => {
                return (
                  <span
                    className={classes.carAtribuut}
                    key={`${auto.id} ${index}`}>
                    <Typography gutterBottom variant='subtitle1' component='h2'>
                      {keysPopis[key]}
                    </Typography>
                    <Typography variant='subtitle2' component='h2'>
                      {auto[key]}
                    </Typography>
                  </span>
                );
                // console.log(key);
                // console.log(jeden[key]);
                // <div></div>;
              })}
            </div>
          );
        })} */}
      </Paper>
    </aside>
  );
};

export default SingleCar;

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
    '& h2': {
      letterSpacing: '0.1rem',
      cursor: 'unset',
      paddingLeft: 1,
    },
  },
}));

const testData = [
  {
    id: 1,
    spz: 'BA458CD',
    img: '../img/01fabiaGreen.png',
    znacka: 'skoda',
    model: 'fabia II',
    farba: 'zelena',
    palivo: 'LPG',
    vykon: 88,
    spotreba: 7,
    znamka: true,
    pozicane: false,
    cena: 59,
    popis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ipsum nunc, dictum vel dapibus at, luctus sit amet diam. Nam.',
    vybava: 'rádio, elektrické okná, vyhrievané sedačky, parkoví asistent',
  },
];

const keysPopis = {
  id: 'id',
  farba: 'Farba:',
  palivo: 'Palivo:',
  vykon: 'Výkon:',
  spotreba: 'Spotreba:',
  znamka: 'Dialničná známka',
  vybava: 'Výbava',
};
