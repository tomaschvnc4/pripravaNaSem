import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

import dataFile from './cars_data';

const AppContext = React.createContext();

const defaultValues = {
  add_edit_car: {
    open: false,
    id: '',
  },
  user: {
    id: '',
    meno: '',
    username: '',
    heslo: '',
    email: '',
    telefon: '',
    kredit: '0',
    isAdmin: false,
  },
};
let stiahnuteData = {};

const AppProvider = ({ children }) => {
  const serverPath = 'http://localhost:3001';
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [isFaild, setIsFaild] = useState(false);
  //const [isOpenDialogCar, setOpenDialogCar] = useState(false);
  const [isOpenDialogLogOut, setOpenDialogLogOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isFetchData, setIsFetchData] = useState(true);

  const [autoNaUpravu, setautoNaUpravu] = useState({});
  const [resMsg, setResMsg] = useState('');
  const [dataCars, setDataCars] = useState([]);
  const [kategorie, setKategorie] = useState([]); //unikatn ekategorie
  const [pocetVKat, setPocetVKat] = useState({ kategoria: 0 }); //kategoria ==key ... kategoria :pocet
  const [add_edit_car, setAdd_edit_car] = useState(defaultValues.add_edit_car);
  const [user, setUser] = useState(defaultValues.user);

  //=====basic METORY=====
  const handleLogin = (val) => setIsLogin(val);
  const handleIsAdmin = (val) => setIsAdmin(val);
  const handleIsFailed = (val) => setIsFaild(val);
  //const handleDialogCar = () => setOpenDialogCar(!isOpenDialogCar);
  const handleDialogLogOut = () => setOpenDialogLogOut(!isOpenDialogLogOut);
  const handleIsFetchData = () => setIsFetchData(!isFetchData);

  const handleResMsg = (val) => setResMsg(val);
  const handleAdd_edit_car = (open = false, id = '') => {
    if (id && id !== 'new') {
      const autoNaUpravutmp = dataCars.find((item) => item.id == id);
      // autoNaUpravutmp && setautoNaUpravu(autoNaUpravutmp);
      setautoNaUpravu(autoNaUpravutmp);
    }
    setAdd_edit_car({ open, id });
  };
  const _setautoNaUpravu = (val) => setautoNaUpravu(val);

  //=======METODY==========
  const nastavKategorie = () => {
    let allKategorie = ['Všetky', ...new Set(stiahnuteData.map((car) => car.znacka))];
    let allKategorieobj = {};
    allKategorie.map((znacka) => {
      let pocet = 0;
      stiahnuteData.map((item) => {
        if (item.znacka === znacka) pocet++;
      });
      allKategorieobj[znacka] = pocet;
      allKategorieobj['Všetky'] += pocet;
    });
    setPocetVKat(allKategorieobj);
    setKategorie(allKategorie);
  };

  const filterItems = (znacka) => {
    console.log(stiahnuteData);
    if (znacka === 'Všetky') {
      setDataCars(stiahnuteData);
    } else {
      const newItems = stiahnuteData.filter((car) => car.znacka === znacka);
      setDataCars(newItems);
    }
  };

  const fetchAuta = async () => {
    setIsLoading(true);
    const response = await axios.get('http://localhost:3001/getAuta');
    console.log(response);
    stiahnuteData = [...response.data]; //urobim kopiu nie referenciu
    setDataCars(response.data);
    nastavKategorie();
    setIsLoading(false);
  };

  const handleUser = (newUser) => {
    console.log(newUser);
    setUser(newUser ? newUser : defaultValues.user);
  };

  useEffect(() => {
    fetchAuta();
  }, [isFetchData]);

  // useEffect(() => {
  //   setAdd_edit_car(defaultValues.add_edit_car);
  // }, [add_edit_car]);

  //   ==RETURN===
  return (
    <AppContext.Provider
      value={{
        serverPath,
        isLoading,
        dataCars,
        kategorie,
        setKategorie,
        isLogin,
        handleLogin,
        isFaild,
        handleIsFailed,
        // isOpenDialogCar,
        // handleDialogCar,
        isOpenDialogLogOut,
        handleDialogLogOut,
        resMsg,
        handleResMsg,
        isAdmin,
        handleIsAdmin,
        add_edit_car,
        handleAdd_edit_car,
        kategorie,
        filterItems,
        pocetVKat,
        handleIsFetchData,
        _setautoNaUpravu,
        autoNaUpravu,
        user,
        handleUser,
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
