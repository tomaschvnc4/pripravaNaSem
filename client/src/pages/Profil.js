import React from 'react';
import { useGlobalContext } from '../context';

import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Info from '../components/Info';

const Profil = () => {
  const { user } = useGlobalContext();
  const classes = useStyles();

  return (
    <section className='center login width-100'>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={8} sm={8} md={5}>
          <Card className={classes._main} component='main'>
            <CardContent>
              <div className={classes.title}>
                <Typography variant='h4' component='h2'>
                  Profil
                </Typography>
              </div>
              <div className={classes._subtitle}>
                <Typography gutterBottom variant='subtitle1' component='h2'>
                  ID:
                </Typography>
                <Typography variant='subtitle2' component='h2'>
                  {user.id}
                </Typography>
              </div>
            </CardContent>
            <CardContent>
              <Info id={user.id} typ={'user'} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
};

export default Profil;

//MUI-Styles
const useStyles = makeStyles((theme) => ({
  _rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: '#000000',
  },

  _main: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // maxWidth: 345,
    width: '90%',
    marginTop: 40,

    boxShadow: theme.shadows[5],
    '&:hover': {
      boxShadow: theme.shadows[24],
    },
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '.5px dotted #617d98',
  },

  _subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      opacity: 0.6,
    },
  },
}));
