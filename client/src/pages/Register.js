import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';

//MUI
import { Button, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useGlobalContext } from '../context';

const registerFields = {
   //kde kluc bude tiez pouzity ako id aj name
   meno: {
      type: 'text',
      label: 'Meno(*)',
      placeholder: 'Meno',
      pattern: /^[a-zA-Z0-9 ]*$/,
      patternMsg: 'Meno obsahuje nepovolené znaky.',
      requiredMsg: 'Meno je potrebné vyplniť.',
   },
   email: {
      type: 'email',
      label: 'Email(*)',
      placeholder: 'Email',
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      patternMsg: 'Nepodporovaný email!',
      requiredMsg: 'Emial je potrebné vyplniť.',
   },
   telefon: {
      type: 'text',
      label: 'Tel.číslo(*)',
      placeholder: 'Tel.číslo',
      pattern: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      patternMsg: 'Nesprávny formát telefónneho čisla!',
      requiredMsg: 'Tel.číslo je potrebné vyplniť.',
   },
   username: {
      type: 'text',
      label: 'Login(*)',
      placeholder: 'Login',
      pattern: /^[a-zA-Z0-9_-]*$/,
      patternMsg: 'Login obsahuje nepovolené znaky!',
      requiredMsg: 'Login je potrebné vyplniť.',
   },
};

const fieldKeysRegister = Object.keys(registerFields);
console.log(fieldKeysRegister);

const Register = () => {
   const classes = useStyles();
   const {
      resMsg,
      isResgistraciaUspesna,

      registracia,
   } = useGlobalContext();
   const { register, handleSubmit, errors } = useForm();
   //myState
   const [isShowPass, setisShowPass] = useState(false);

   const onSubmit = async (data, e) => {
      // e.target.reset();
      registracia(data);
   };

   if (isResgistraciaUspesna) {
      return <Redirect to={{ pathname: '/login' }} />;
   }
   // ===RENDER===
   return (
      <section className='section2 center'>
         <div className='login'>
            <Paper elevation={5} className={classes._root}>
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

                  {fieldKeysRegister.map((key, index) => {
                     const {
                        type,
                        label,
                        placeholder,
                        pattern,
                        patternMsg,
                        requiredMsg,
                     } = registerFields[key];
                     return (
                        <TextField
                           key={key}
                           fullWidth
                           variant='outlined'
                           label={label}
                           placeholder={placeholder}
                           name={key}
                           type={type}
                           id={key}
                           error={errors.hasOwnProperty(key)}
                           helperText={errors[key]?.message}
                           inputRef={register({
                              pattern: {
                                 value: new RegExp(pattern),
                                 message: patternMsg,
                              },
                              required: requiredMsg,
                           })}
                        />
                     );
                  })}
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
                     inputRef={register({ required: 'Heslo je potrebne vyplnit' })}
                     InputProps={{
                        endAdornment: (
                           <IconButton onClick={() => setisShowPass(!isShowPass)}>
                              {isShowPass ? <Visibility /> : <VisibilityOff />}
                           </IconButton>
                        ),
                     }}
                  />
                  <Typography variant='subtitle1' component='h6' color='secondary'>
                     {resMsg}
                  </Typography>
                  <Button fullWidth variant='contained' color='primary' type='submit'>
                     Registrovať sa
                  </Button>
               </form>
            </Paper>
         </div>
      </section>
   );
};

export default Register;

const useStyles = makeStyles((theme) => ({
   _root: {
      padding: '20px',
      // textTransform: 'capitalize',
      '& .MuiFormControl-root': {
         margin: '5px 0 5px 0',
      },
      '& .MuiButton-root ': {
         marginTop: '20px',
      },
   },
}));
