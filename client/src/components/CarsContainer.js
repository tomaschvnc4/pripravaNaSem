import React from 'react';

//komponenty
import Car from './Car';
import Loading from './Loading';

//MUI
import { Avatar, Badge, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import { useGlobalContext } from '../context';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  // sidebar: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  _width: {
    width: '100%',
    '@media screen and (max-width: 960px)': {
      width: '100%',
    },
    '& .MuiBadge-root': {
      width: 'inherit',
    },
    '& .MuiButton-root': {
      width: 'inherit',
    },
  },
  _btnPaddnig: {
    padding: '7px',
  },
  _root: {
    paddingLeft: '10px',
    paddingTop: '20px',
    // '@media (min-width: 600px)': {
    '@media screen and (max-width: 960px)': {
      padding: '20px 20px 30px 20px',
      // backgroundColor: '#80ff00',
    },
  },
  _maLabel: {
    textTransform: 'capitalize',
  },
}));

const CarsContainer = () => {
  const { isLoading, dataCars } = useGlobalContext();

  //===RENDER
  if (isLoading) {
    return <Loading />;
  }

  if (dataCars.length < 1) {
    return <h2 className='section-title'>no cars</h2>;
  }

  return (
    <section>
      <Grid container direction='row' justify='space-around'>
        <_SideBar />
        <_List />
      </Grid>
    </section>
  );
};

export default CarsContainer;

const test = [1, 2, 3, 4];

const _SideBar = (params) => {
  const classes = useStyles();

  return (
    // <Grid container item xs={12} md={2} style={{ backgroundColor: '#6889fb' }}>

    <Grid container item xs={8} md={2} spacing={4} className={classes._root}>
      <div style={{ height: '100%' }} className={classes._width}>
        <div className={`${classes._width} ${classes._btnPaddnig}`}>
          <Button
            variant='contained'
            color='primary'
            style={{ cursor: 'unset' }}>
            Znacky
          </Button>
        </div>

        {test.map((index) => {
          return (
            <div
              key={index}
              className={`${classes._width} ${classes._btnPaddnig}`}>
              <Badge badgeContent={4} color='secondary'>
                <Button
                  variant='outlined'
                  color='primary'
                  classes={{ label: classes._maLabel }}>
                  volkswagen
                </Button>
              </Badge>
            </div>
          );
        })}
      </div>
    </Grid>
  );
};

const _List = (params) => {
  return (
    <Grid container item xs={12} md={10} spacing={3} justify='space-around'>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Car />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Car />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Car />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Car />
      </Grid>
    </Grid>
  );
};
