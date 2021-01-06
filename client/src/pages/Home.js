import { Grid } from '@material-ui/core';
import React from 'react';
import CarsContainer from '../components/CarsContainer';
import SearchForm from '../components/SearchForm';
import { useGlobalContext } from '../context';

const Home = () => {
  // const { showNav } = useGlobalContext();
  console.log('Home');
  return (
    <div>
      Home
      <Grid container justify='center'>
        <Grid item xs={2} sm={2} md={2}></Grid>
        <Grid item xs={8} sm={8} md={9} style={{ padding: '5px 10px 10px 28px' }}>
          <SearchForm />
        </Grid>
        <Grid item xs={2} sm={2} md={1}></Grid>
      </Grid>
      <CarsContainer />
    </div>
  );
};

export default Home;
