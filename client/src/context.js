import React, { useState, useContext, useEffect } from 'react';

import dataFile from './cars_data';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchAuta = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(dataFile);
      setIsLoading(false);
    }, 100);
    console.log(data);
  };

  useEffect(() => {
    fetchAuta();
  }, []);

  //   ==RETURN===

  return <AppContext.Provider value={}>{children}</AppContext.Provider>;
};

//====USE this customm hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
