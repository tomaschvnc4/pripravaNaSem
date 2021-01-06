import React, { useState } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';

//MUI
import { Button, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useGlobalContext } from '../context';

const Login = () => {
  const classes = useStyles();
  const {
    handleLogin,
    isLogin,
    isFaild,
    handleIsFailed,
    resMsg,
    handleResMsg,
    handleUser,
    prihlasenie,
  } = useGlobalContext();

  const { register, handleSubmit, errors } = useForm();
  //my states
  const [isShowPass, setisShowPass] = React.useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    prihlasenie(data);
    // console.log(data);
    //     const { username, heslo } = data;
    // handleResMsg('');
    //----/// Axios.defaults.withCredentials = true;
    // Axios.post('http://localhost:3001/login', {
    //   ...data,
    // }).then((response) => {
    //   const { stat, msg, newUser } = response.data;
    //   console.log(newUser);
    //   if (stat === true) {
    //     console.log('logged');
    //     handleIsFailed(false);
    //     handleLogin(true);
    //     handleResMsg('');
    //     handleUser({ ...newUser });
    //   } else {
    //     console.log('failed');
    //     handleIsFailed(true);
    //     handleResMsg(msg);
    //   }
    // });
  };
  if (isLogin) {
    return <Redirect to={{ pathname: '/' }} />;
  }
  // ===RENDER===
  return (
    <section className='section2 center'>
      <div className='login'>
        <Paper elevation={5} className={classes._root}>
          {isFaild && (
            <Typography variant='subtitle1' component='h6' color='secondary'>
              {resMsg}
            </Typography>
          )}
          {resMsg && !isFaild && (
            <Typography variant='subtitle1' component='h6' color='secondary'>
              {resMsg}
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='between-center'>
              <Typography variant='h4' component='h4' color='primary'>
                Prihlásenie
              </Typography>
              <Link to='/'>
                <IconButton color='primary' onClick={() => handleResMsg('')}>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </div>

            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='login(*)'
              placeholder='login'
              name='username'
              type='text'
              id='username'
              error={errors.hasOwnProperty('username')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
              helperText={errors.username?.message}
              // onChange={(e) => setFullName(e.target.value)}
              inputRef={register({
                pattern: {
                  //   value: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  //   message: 'Meno vyzaduje len znaky ',
                },
                required: 'Meno je potrebne vyplnit ',
              })}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='heslo(*)'
              placeholder='heslo'
              name='heslo'
              type={isShowPass ? 'text' : 'password'}
              id='heslo'
              error={errors.hasOwnProperty('heslo')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
              helperText={errors.heslo?.message}
              // onChange={(e) => setFullName(e.target.value)}
              inputRef={register({ required: 'Heslo je potrebne vyplnit' })}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setisShowPass(!isShowPass)}>
                    {isShowPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Button fullWidth variant='contained' color='primary' type='submit'>
              Prihlásiť sa
            </Button>
            <Typography variant='subtitle2' component='h5' className='center'>
              Ešte nemáte účet,{' '}
              <Link
                to='/register'
                onClick={() => {
                  handleResMsg('');
                }}>
                zaregistrujte
              </Link>
              sa teraz.
            </Typography>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  //   _padding: {
  // //     padding: '10px',
  //   },
  _root: {
    padding: '20px',
    textTransform: 'capitalize',
    '& .MuiFormControl-root': {
      margin: '5px 0 5px 0',
    },
    '& .MuiButton-root ': {
      marginTop: '20px',
    },
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '& h5': {
      textTransform: 'none',
    },
  },
}));
