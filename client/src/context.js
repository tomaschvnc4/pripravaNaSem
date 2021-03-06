import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';

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
let stiahnuteData = [];
Axios.defaults.withCredentials = true;
const AppProvider = ({ children }) => {
   const serverPath = 'http://localhost:3001';
   const [isLoading, setIsLoading] = useState(true);
   const [isLogin, setIsLogin] = useState(false);
   const [isFaild, setIsFaild] = useState(false);
   const [isResgistraciaUspesna, setisResgistraciaUspesna] = useState(false);
   // const [isOpenDialogCar, setOpenDialogCar] = useState(false);
   const [isOpenDialogPotvrd, setOpenDialogPotvrd] = useState(false);
   const [isOpenDialogLogOut, setOpenDialogLogOut] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isFetchData, setIsFetchData] = useState(true);

   const [autoNaUpravu, setautoNaUpravu] = useState({});
   const [resMsg, setResMsg] = useState('');
   const [dataCars, setDataCars] = useState([]);
   const [dataVypozicky, setDataVypozicky] = useState([]);
   const [kategorie, setKategorie] = useState([]); //unikatne kategorie
   const [pocetVKat, setPocetVKat] = useState({ kategoria: 0 }); //kategoria ==key ... kategoria :pocet
   const [add_edit_car, setAdd_edit_car] = useState(defaultValues.add_edit_car);
   const [user, setUser] = useState(defaultValues.user);
   const [searchTerm, setSearchTerm] = useState('');

   //=====basic METORY=====
   const handleLogin = (val) => setIsLogin(val);
   const handleIsAdmin = (val) => setIsAdmin(val);
   const handleIsFailed = (val) => setIsFaild(val);
   //const handleDialogCar = () => setOpenDialogCar(!isOpenDialogCar);
   const handleDialogLogOut = () => setOpenDialogLogOut(!isOpenDialogLogOut);
   const handleDialogPotvrd = () => setOpenDialogPotvrd(!isOpenDialogPotvrd);
   const handleIsFetchData = () => setIsFetchData(!isFetchData);

   const handleResMsg = (val) => setResMsg(val);
   const handleAdd_edit_car = (open = false, id = '') => {
      if (id && id !== 'new') {
         const autoNaUpravutmp = dataCars.find((item) => item.id == id);
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

   const handleUser = (newUser) => {
      console.log(newUser);
      setUser(newUser ? newUser : defaultValues.user);
   };

   const odhlasenie = () => {
      // document.cookie = 'userId=delete' + '; expires=' + new Date(2000, 12, 25).toUTCString();
      // let x = document.cookie;
      setOpenDialogLogOut(!isOpenDialogLogOut);
      setIsAdmin(false);
      setDataVypozicky([]);
      setIsLogin(false);
      setUser({});
   };

   const prihlasenie = async (data) => {
      console.log(data);
      setResMsg('');
      const response = await Axios.post('http://localhost:3001/login', {
         ...data,
      });
      console.log(response);
      const { stat, msg, newUser } = response.data;
      console.log(newUser);
      if (stat) {
         console.log('logged');
         setIsFaild(false);
         setIsLogin(true);
         resMsg || setResMsg(''); //ak resMsg je daka sprava tak vynuluj
         handleUser({ ...newUser });
         if (newUser.isAdmin) {
            setIsAdmin(!!newUser.isAdmin);
         }
      } else {
         console.log('failed');
         setIsFaild(true);
         setResMsg(msg);
      }
   };

   const registracia = async (data) => {
      handleResMsg('');
      console.log(data);

      const response = await Axios.post('http://localhost:3001/register', {
         ...data,
      });
      console.log(response);
      handleResMsg(response.data.msg);

      if (response.data.stat) {
         setisResgistraciaUspesna(true);
      }
   };

   const fetchAuta = async () => {
      setIsLoading(true);
      const responseAuta = await Axios.get('http://localhost:3001/auta/getAuta');
      console.log(responseAuta);
      const responsePozicaneAutaId = await Axios.get('http://localhost:3001/vypozicka/pozicaneID');
      const idPozicaneArray = responsePozicaneAutaId.data.result;
      stiahnuteData = responseAuta.data.map((auto) => {
         //ak mi vrati objekt auto je pozicane ulozim si TRUE ak nie je pozicane vrati undefined a tak vratim FALSE
         let pozicane = idPozicaneArray.find((objResult) => auto.id === objResult.id_auto)
            ? true
            : false;
         return { ...auto, pozicane }; //tu vlastne pridam k autam atribut ci je pozicane alebo nie
      });
      console.log(stiahnuteData);
      setDataCars(stiahnuteData);
      nastavKategorie();
      setIsLoading(false);
   };

   const fetchVypozicky = async () => {
      setIsLoading(true);
      const { id } = user;
      const response = await Axios.get(`http://localhost:3001/vypozicka/get/${isAdmin}/${id}`);
      console.log(response.data);
      let { result } = response.data;
      // const tmp = { ...result };
      result.sort((a, b) => b.id - a.id);
      setDataVypozicky(result);
      console.log('fetch');
      setIsLoading(false);
   };

   const zmazVypozicku = async (id_vypozicka) => {
      setIsLoading(true);
      let response = await Axios.delete(`http://localhost:3001/vypozicka/delete/${id_vypozicka}`);
      console.log(response.data);
      fetchVypozicky();
      setIsLoading(false);
      fetchAuta();
   };

   const potvrdPozicanie = async ({ id_vypozicka, column }) => {
      const datum = moment.now();
      // console.log(props);
      let response = await Axios.put(
         `http://localhost:3001/vypozicka/update/${column}/${datum}/${id_vypozicka}`
      );
      fetchVypozicky();
      fetchAuta();
   };

   const deleteCar = async (id_auto) => {
      const response = await Axios.delete(`http://localhost:3001/auta/delete/${id_auto}`);
      handleIsFetchData();
   };

   useEffect(() => {
      fetchAuta();
   }, [isFetchData]);

   // useEffect(() => {
   //    Axios.get('http://localhost:3001/login').then((response) => {
   //       if (response.data.loggedIn) {
   //          console.log(response);
   //          const LoggedUser = response.data.user;
   //          setIsAdmin(!!LoggedUser.isAdmin);
   //          setIsLogin(true);
   //          handleUser(LoggedUser);
   //       }
   //    });
   // }, []);

   useEffect(() => {
      const results = stiahnuteData.filter((item) => item.model.toLowerCase().includes(searchTerm));
      results && setDataCars(results);
   }, [searchTerm]);

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
            dataVypozicky,
            fetchVypozicky,
            zmazVypozicku,
            potvrdPozicanie,
            odhlasenie,
            prihlasenie,
            setSearchTerm,
            isOpenDialogPotvrd,
            handleDialogPotvrd,
            deleteCar,
            isResgistraciaUspesna,
            setisResgistraciaUspesna,
            registracia,
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
