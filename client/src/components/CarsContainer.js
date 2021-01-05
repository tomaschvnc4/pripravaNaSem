import React from 'react';
import { Redirect } from 'react-router-dom';
//komponenty
import Car from './Car';
import Loading from './Loading';

//MUI
import { Badge, Button, Grid } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { useGlobalContext } from '../context';
import { green } from '@material-ui/core/colors';
import Car_add from './Car_add';

const useStyles = makeStyles((theme) => ({
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

const themeGreen = createMuiTheme({
  palette: {
    primary: green,
  },
});

const CarsContainer = () => {
  const { isLoading, dataCars, add_edit_car } = useGlobalContext();

  //===RENDER
  if (isLoading) {
    return <Loading />;
  }
  const { open, id } = add_edit_car;
  if (open) {
    if (id) {
      return <Redirect to={{ pathname: `/addCar/${id}` }} />;
    }
    return <Redirect to={{ pathname: '/addCar/new' }} />;
  }

  if (dataCars.length < 1) {
    return (
      <section>
        <Grid container direction='row' justify='space-around'>
          <_SideBar />
          <Grid item xs={12} md={10}>
            <h2 className='section-title'>no cars</h2>
          </Grid>
        </Grid>
      </section>
    );
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

const _SideBar = () => {
  const { isAdmin, handleAdd_edit_car, kategorie, filterItems, pocetVKat } = useGlobalContext();
  const classes = useStyles();

  return (
    // <Grid container item xs={12} md={2} style={{ backgroundColor: '#6889fb' }}>

    <Grid container item xs={8} md={2} spacing={4} className={classes._root}>
      <div style={{ height: '100%' }} className={classes._width}>
        <div className={`${classes._width} ${classes._btnPaddnig}`}>
          <Button variant='contained' color='primary' style={{ cursor: 'unset' }}>
            Značky áut
          </Button>
        </div>

        {kategorie.map((znacka, index) => {
          return (
            <div key={index} className={`${classes._width} ${classes._btnPaddnig}`}>
              <Badge badgeContent={pocetVKat[znacka]} color='secondary'>
                <Button
                  variant='outlined'
                  color='primary'
                  className='sidebar-btn'
                  classes={{ label: classes._maLabel }}
                  onClick={() => filterItems(znacka)}>
                  {znacka}
                </Button>
              </Badge>
            </div>
          );
        })}
        {isAdmin && (
          <div className={`${classes._width} ${classes._btnPaddnig}`}>
            <ThemeProvider theme={themeGreen}>
              <Button variant='contained' color='primary' onClick={() => handleAdd_edit_car(true)}>
                Pridať auto &nbsp;
                <AddCircleOutlineIcon />
              </Button>
            </ThemeProvider>
          </div>
        )}
      </div>
    </Grid>
  );
};

const _List = (params) => {
  const { dataCars } = useGlobalContext();

  return (
    <Grid container item xs={12} md={10} spacing={3} justify='space-around'>
      {dataCars.map((car, index) => {
        return (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
            {/* {console.log(car)} */}
            <Car {...car} />
          </Grid>
        );
      })}
    </Grid>
  );
};
