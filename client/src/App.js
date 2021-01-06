import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useGlobalContext } from './context';

//pages
import Home from './pages/Home';
import Vypozicky from './pages/Vypozicky';
import A_users from './pages/A_users';
import A_vypozicky from './pages/A_vypozicky';
import About from './pages/About';
import Error from './pages/Error';
import Profil from './pages/Profil';
import Login from './pages/Login';
import RegisterPage from './pages/Register';

//component
import Navbar from './components/Navbar';
import Car_add from './components/Car_add';

//css
import './App.css';

function App() {
  // const { isShowNav, showNav, hideNav } = useGlobalContext();
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Navbar />
          <Home />
        </Route>
        <Route path='/vypozicky'>
          <Navbar />
          <A_vypozicky />
        </Route>
        <Route path='/about'>
          <Navbar />
          <About />
        </Route>
        <Route path='/profil'>
          <Navbar />
          <Profil />
        </Route>
        <Route path='/admin'>
          <Navbar />
          <A_vypozicky />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/addCar/:id' children={<Car_add />}></Route>
        <Route path='/*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
