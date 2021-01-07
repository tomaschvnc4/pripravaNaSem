import React, { useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
// import moment from 'moment';
import Axios from 'axios';

import * as yup from 'yup';
import Loading from './Loading';
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
   LinearProgress,
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

// const schema = yup.object().shape({
//   picture: yup
//     .mixed()
//     .required('Je potrebé vybrať obrázok!')
//     .test('fileSize', 'Obrázok je príliš veľký', (value) => {
//       return value && value[0].size <= 2000000; //2MB
//     })
//     .test('type', 'Nepodporovaný typ obrázku', (value) => {
//       return value && value[0].type === 'image/jpg';
//     }),
// });

const Car_add = () => {
   const classes = useStyles();
   const {
      resMsg,
      handleResMsg,
      isAdmin,
      handleIsFetchData,
      add_edit_car,
      autoNaUpravu,
      _setautoNaUpravu,
      handleAdd_edit_car,
      isLoading,
      isLogin,
   } = useGlobalContext();
   const { register, handleSubmit, errors } = useForm();
   //myState
   const [znamka, setZnamka] = useState(false);
   const [fileName, setFileName] = useState('');
   const [allowSubmit, setAllowSubmit] = useState(true);

   const { id } = useParams();
   // console.log(id);

   const pridat = id === 'new' ? true : false;
   const onChange = (e) => {
      e.target.files[0] && setFileName(e.target.files[0].name);
   };

   const onSubmitEdit = (data, e) => {
      handleResMsg('');
      // e.preventDefault();
      setAllowSubmit(false);
      let spz = data.spz.toUpperCase();
      const path = autoNaUpravu.image.slice(16);
      console.log(path);
      const tmp = { ...data, znamka, spz, id };
      console.log(tmp);

      Axios.put('http://localhost:3001/auta/update', { ...tmp }).then((response) =>
         handleResMsg(response.data.msg)
      );
      if (data.picture[0]) {
         const formData = new FormData();
         formData.append('picture', data.picture[0]);
         const props = { spz: spz, path: path };
         console.log(props);
         fetch(`http://localhost:3001/auta/update/picture/${spz}/${path}`, {
            method: 'PUT',
            body: formData,
         }).then((responseImg) => {
            console.log('obrazok uploadnuty');
         });
      }
      setTimeout(() => {
         handleIsFetchData();
         setAllowSubmit(true);
      }, 1000);
   };

   const onSubmitAdd = async (data, e) => {
      if (fileName === '') {
         handleResMsg('Obrázok je potrebné vybrať');
      } else {
         setAllowSubmit(false);
         handleResMsg('');
         let spz = data.spz.toUpperCase();
         const tmp = { ...data, znamka, spz };
         console.log(tmp);
         const formData = new FormData();
         formData.append('picture', data.picture[0]);

         const response = await Axios.post('http://localhost:3001/auta/add', {
            ...tmp,
            // znamka,
         });
         const { msg, stat } = await response.data;
         if (stat) {
            const resImg = await fetch(`http://localhost:3001/auta/update/picture/${spz}`, {
               method: 'PUT',
               body: formData,
            });
            const dataRes = await resImg.json();
            // console.log(dataRes);
         }
         setTimeout(() => {
            if (stat) {
               e.target.reset();
               setFileName('');
               handleIsFetchData();
            }
            handleResMsg(msg);
            setAllowSubmit(true);
         }, 1000);
      }
   };

   useEffect(() => {
      if (id !== 'new') {
         setZnamka(!!autoNaUpravu?.znamka);
         console.log('useeffect');
         console.log(znamka);
      }
   }, [znamka]);

   //   if (isLogin) {
   //     return <Redirect to={{ pathname: '/' }} />;
   //   }

   // z d;vodu ked som na upravit auto a refresnem stranku chcecm aby som sa dostal na pridat nove auto lebo pri refresh sa mi resetnu staty ...cize b ostal prazny formular na upravu auta
   if (add_edit_car.id === '' && id !== 'new') {
      return <Redirect to={{ pathname: '/addCar/new' }} />;
   }

   // ===RENDER===
   if (!isLogin) {
      return <Redirect to={{ pathname: '/' }} />;
   }
   if (isLoading) {
      return <Loading />;
   }

   return (
      <section className='section2 center'>
         <div className='addCar'>
            <Paper elevation={5} className={classes._root}>
               {/* {true && (
            <Typography variant='subtitle1' component='h6' color='secondary'>
              Zle meno/heslo
            </Typography> 
          )}*/}
               <form
                  onSubmit={pridat ? handleSubmit(onSubmitAdd) : handleSubmit(onSubmitEdit)}
                  encType='multipart/form-data'>
                  <div className='between-center'>
                     <Typography variant='h4' component='h4' color='primary'>
                        {pridat ? 'Pridať ' : 'Upraviť'} auto
                     </Typography>
                     <Link to='/'>
                        <IconButton
                           color='primary'
                           onClick={() => {
                              handleResMsg('');
                              handleAdd_edit_car();
                              _setautoNaUpravu({});
                           }}>
                           <ArrowBackIcon />
                        </IconButton>
                     </Link>
                  </div>

                  <Grid container direction='row' justify='space-around' spacing={1}>
                     {fieldKeys.map((key, index) => {
                        const {
                           type,
                           label,
                           placeholder,
                           endAdorment: ozdoba,
                        } = addCarFormSettings[key];
                        return (
                           <Grid item xs={12} md={6} key={index}>
                              <TextField
                                 fullWidth
                                 variant='outlined'
                                 defaultValue={pridat ? '' : autoNaUpravu[key]}
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
                                    endAdornment: (
                                       <InputAdornment position='start'>
                                          {ozdoba && ozdoba}
                                          {!pridat && isAdmin && (
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
                     <Grid item xs={12}>
                        <TextField
                           style={{ width: '100%' }}
                           id='popis'
                           label='popis'
                           multiline
                           placeholder='Popis'
                           variant='outlined'
                           name='popis'
                           defaultValue={pridat ? '' : autoNaUpravu['popis']}
                           inputRef={register}
                        />
                     </Grid>

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
                           name='picture'
                           ref={register}
                        />
                        <label htmlFor='icon-button-file' className={classes.labelfile}>
                           <IconButton color='primary' component='span'>
                              <PhotoCamera />
                           </IconButton>
                           <TextField
                              value={fileName}
                              placeholder={pridat ? '<= Vybrať obrázok' : '<= Zmeniť obrázok'}
                              // ref={register(({required: 'Obrázok je potrebné vybrať'}))}
                           />
                        </label>
                     </Grid>
                     <Typography variant='subtitle1' component='h6' color='secondary'>
                        {resMsg}
                        {errors.picture && <p>{errors.picture.message}</p>}
                     </Typography>
                     {!allowSubmit && <LinearProgress style={{ width: '100%' }} />}
                     <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={!allowSubmit}>
                        {pridat ? 'Pridať ' : 'Upraviť'} auto
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
      '& .MuiButton-root ': {
         marginTop: '10px',
      },
   },
   inputfile: {
      display: 'none',
   },
   labelfile: {
      display: 'flex',
      marginLeft: '-12px',
   },
}));
