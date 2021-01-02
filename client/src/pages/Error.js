import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useGlobalContext } from '../context';

const useStyles = makeStyles((theme) => ({
  fullView: {
    height: '95vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1E25',
    '& .MuiPaper-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    '& h1': {
      fontWeight: '800',
    },
    '& h3 ': {
      borderBottom: '3px solid #0E1E25',
    },
    '& button ': {
      marginTop: '10px',
      fontWeight: '800',
      textTransform: 'capitalize',
      letterSpacing: '1px',
    },
  },
}));

const Error = () => {
  const classes = useStyles();
  // const { hideNav } = useGlobalContext();

  return (
    <div className={classes.fullView}>
      <Paper elevation={10}>
        <Typography variant='h1' component='h1'>
          404
        </Typography>
        <Typography variant='h3' component='h3'>
          Stránka nenájdená
        </Typography>
        <Link to='/'>
          <Button
            color='primary'
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}>
            Domov
          </Button>
        </Link>
      </Paper>
    </div>
  );
};

export default Error;
