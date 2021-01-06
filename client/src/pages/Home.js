import { Grid } from '@material-ui/core';
import React from 'react';
import CarsContainer from '../components/CarsContainer';
import { useGlobalContext } from '../context';

const Home = () => {
  // const { showNav } = useGlobalContext();
  console.log('Home');
  return (
    <div>
      Home
      <CarsContainer />
    </div>
  );
};

export default Home;
