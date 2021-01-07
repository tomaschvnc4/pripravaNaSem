import React from 'react';
import { useGlobalContext } from '../context';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';

const SearchForm = () => {
   const { setSearchTerm } = useGlobalContext();
   const searchValueRef = React.useRef('');

   const searchAuto = () => {
      setSearchTerm(searchValueRef.current.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <section className=''>
         <form onSubmit={handleSubmit}>
            <TextField
               fullWidth
               variant='outlined'
               label='Vyhladaj'
               placeholder='Vyhľadaj auto poďla modelu:'
               size='small'
               inputRef={searchValueRef}
               onChange={searchAuto}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position='start'>
                        <SearchIcon />
                     </InputAdornment>
                  ),
               }}
            />
         </form>
      </section>
   );
};

export default SearchForm;
