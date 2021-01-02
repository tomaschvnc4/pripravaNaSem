import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import { useForm } from 'react-hook-form';

//MUI
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useGlobalContext } from '../context';

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

const logint = {
  login: 'jano',
  heslo: 'jano1',
};

const Login = () => {
  const classes = useStyles();
  const { handleLogin, isLogin, isFaild, handleIsFailed } = useGlobalContext();
  const { register, handleSubmit, errors } = useForm();
  const [isShowPass, setisShowPass] = React.useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
  };

  const time = () => {
    let time;
    // setInterval(() => {
    //   //   time = new Date().getTime();
    //   time = moment.now();
    //   console.log(time);
    //   time = moment(time).format('DD/MM/YYYY HH:mm:ss');
    //   console.log(time);
    // }, 500);
  };

  //   if (isLogin) {
  //     return <Redirect to={{ pathname: '/' }} />;
  //   }
  // ===RENDER===
  return (
    <section className='section2 center'>
      <div className='login'>
        <Paper elevation={5} className={classes._root}>
          {isFaild && (
            <Typography variant='subtitle1' component='h6' color='secondary'>
              Zle meno/heslo
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='between-center'>
              <Typography variant='h4' component='h4' color='primary'>
                Registrácia
              </Typography>
              <Link to='/'>
                <IconButton color='primary'>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </div>

            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='Meno(*)'
              placeholder='Meno'
              name='meno'
              type='text'
              id='meno'
              error={errors.hasOwnProperty('meno')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
              helperText={errors.meno?.message}
              // onChange={(e) => setFullName(e.target.value)}
              inputRef={register({
                pattern: {
                  value: /^[a-zA-Z0-9_-]*$/,
                  // value: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  message: 'Meno obsahuje nepovolené znaky ',
                },
                required: 'Meno je potrebne vyplnit ',
              })}
            />
            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='Email(*)'
              placeholder='Email'
              name='email'
              type='email'
              id='email'
              error={errors.hasOwnProperty('email')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
              helperText={errors.email?.message}
              // onChange={(e) => setFullName(e.target.value)}
              inputRef={register({
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  // value: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  message: 'Nesprávny email! ',
                },
                required: 'Emial je potrebne vyplnit ',
              })}
            />
            <TextField
              fullWidth
              multiline
              variant='outlined'
              label='Tel.číslo(*)'
              placeholder='Tel.číslo'
              name='cislo'
              type='text'
              id='cislo'
              error={errors.hasOwnProperty('cislo')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
              helperText={errors.cislo?.message}
              // onChange={(e) => setFullName(e.target.value)}
              inputRef={register({
                pattern: {
                  value: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  message: 'Nesprávny formát telefónneho čisla!',
                },
                required: 'Tel.číslo je potrebne vyplnit ',
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
              Registrovať sa
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={time}>
              Registrovať sa
            </Button>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default Login;
