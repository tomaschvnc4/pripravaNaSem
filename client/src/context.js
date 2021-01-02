import React, { useState, useContext, useEffect, useRef } from 'react';

import dataFile from './cars_data';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [dataCars, setData] = useState([]);
  const [isFaild, setIsFaild] = useState(false);
  const [isOpenDialogCar, setOpenDialogCar] = useState(false);
  const [isOpenDialogLogOut, setOpenDialogLogOut] = useState(false);

  const handleLogin = (val) => setIsLogin(val);
  const handleIsFailed = (val) => setIsFaild(val);
  const handleDialogCar = () => setOpenDialogCar(!isOpenDialogCar);
  const handleDialogLogOut = () => setOpenDialogLogOut(!isOpenDialogLogOut);

  //========
  const fetchAuta = async () => {
    setIsLoading(true);
    console.log('tu pred');
    // const newData = await setData( dataFile);
    setTimeout(() => {
      setData(dataFile);
      console.log('tu');
      setIsLoading(false);
    }, 100);
  };

  console.log('pred fect auta');
  useEffect(() => {
    fetchAuta();
  }, []);

  //   ==RETURN===
  console.log('return context:');
  console.log(dataCars);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        dataCars,
        isLogin,
        handleLogin,
        isFaild,
        handleIsFailed,
        isOpenDialogCar,
        handleDialogCar,
        isOpenDialogLogOut,
        handleDialogLogOut,
      }}>
      {children}
    </AppContext.Provider>
  );
};

//====USE this customm hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
