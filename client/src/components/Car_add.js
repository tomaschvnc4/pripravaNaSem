import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import moment from 'moment';
import Axios from 'axios';

import { useForm } from 'react-hook-form';

//MUI
import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';

import { useGlobalContext } from '../context';

const addCarFormSettings = {
  znacka: {
    type: 'text',
    label: 'Značka',
    placeholder: 'Škoda',
  },
  model: {
    type: 'text',
    label: 'Model',
    placeholder: 'Fabia II',
  },
  farba: {
    type: 'text',
    label: 'Farba',
    placeholder: 'zelená',
  },
  spz: {
    type: 'text',
    label: 'SPZ',
    placeholder: 'BA555XX',
  },
  palivo: {
    type: 'text',
    label: 'Palivo',
    placeholder: 'benzin',
  },
  vykon: {
    type: 'number',
    label: 'Výkon',
    placeholder: '66',
    endAdorment: 'Kw',
  },
  spotreba: {
    type: 'number',
    label: 'Spotreba',
    placeholder: '9',
    endAdorment: 'L/100',
  },
  cena: {
    type: 'number',
    label: 'Cena/deň',
    placeholder: '49',
    endAdorment: '€',
  },
};

const fieldKeys = Object.keys(addCarFormSettings);
console.log(fieldKeys);

const pero = {
  startAdornment: (
    <IconButton size='small' color='primary'>
      <CreateIcon />
    </IconButton>
  ),
};

const Car_add = () => {
  const classes = useStyles();
  const { resMsg, handleResMsg } = useGlobalContext();
  const { register, handleSubmit, errors } = useForm();
  //myState
  //   const [isShowPass, setisShowPass] = useState(false);
  const [znamka, setZnamka] = useState(false);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Vyber obrázok');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = (data, e) => {
    // e.target.reset();
    handleResMsg('');
    let { spz } = data;
    spz = spz.toUpperCase();

    const tmp = { ...data, znamka, spz };
    console.log(tmp);

    Axios.post('http://localhost:3001/addCar', {
      ...tmp,
      znamka,
      img: file,
    }).then((response) => {
      handleResMsg(response.data.msg);
    });
  };

  //   if (isLogin) {
  //     return <Redirect to={{ pathname: '/' }} />;
  //   }
  // ===RENDER===
  return (
    <section className='section2 center'>
      <div className='addCar'>
        <Paper elevation={5} className={classes._root}>
          {/* {true && (
            <Typography variant='subtitle1' component='h6' color='secondary'>
              Zle meno/heslo
            </Typography> 
          )}*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='between-center'>
              <Typography variant='h4' component='h4' color='primary'>
                Pridat auto
              </Typography>
              <Link to='/'>
                <IconButton color='primary' onClick={() => handleResMsg('')}>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </div>

            <Grid container direction='row' justify='space-around' spacing={1}>
              {fieldKeys.map((key, index) => {
                const { type, label, placeholder, endAdorment: ozdoba } = addCarFormSettings[key];
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <TextField
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
                          // value: /^[a-zA-Z0-9_-]*$/,
                          message: 'Pole obsahuje nepovolené znaky!',
                        },
                        required: 'Toto pole je potrebné vyplniť ',
                      })}
                      InputProps={{
                        //   startAdornment: (
                        //     <IconButton size='small' color='primary'>
                        //       <CreateIcon />
                        //     </IconButton>
                        //   ),
                        endAdornment: (
                          <InputAdornment position='start'>
                            {ozdoba && ozdoba}
                            {true && (
                              <IconButton size='small' color='primary'>
                                <CreateIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                );
              })}

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={znamka}
                      onChange={() => setZnamka(!znamka)}
                      name='checkedB'
                      color='primary'
                    />
                  }
                  label='Dialničná známka'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept='image/*'
                  className={classes.inputfile}
                  id='icon-button-file'
                  type='file'
                  onChange={onChange}
                />
                <label htmlFor='icon-button-file' className={classes.labelfile}>
                  <IconButton color='primary' component='span'>
                    <PhotoCamera />
                  </IconButton>
                  <TextField value={fileName} />
                </label>
              </Grid>

              <Typography variant='subtitle1' component='h6' color='secondary'>
                {resMsg}
              </Typography>
              <Button fullWidth variant='contained' color='primary' type='submit'>
                Pridať auto
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default Car_add;

const useStyles = makeStyles((theme) => ({
  _root: {
    padding: '20px',
    '& .MuiFormControl-root': {
      //   margin: '5px 5px 5px 5px',
    },
    '& .MuiButton-root ': {
      marginTop: '10px',
    },
  },
  //   root: {
  //     '& > *': {
  //       margin: theme.spacing(1),
  //     },
  //   },
  inputfile: {
    display: 'none',
  },
  labelfile: {
    display: 'flex',
    marginLeft: '-12px',
  },
}));
