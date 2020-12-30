import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Vypozicky from './pages/Vypozicky';
import A_users from './pages/A_users';
import A_vypozicky from './pages/A_vypozicky';
import About from './pages/About';
import Error from './pages/Error';
import Profil from './pages/Profil';

//component
import Navbar from './components/Navbar';
//css
import './App.css';

function App() {
  return (
    <div>
      hello world
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/vypozicky'>
            <Vypozicky />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/profil'>
            <Profil />
          </Route>
          <Route path='/*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
