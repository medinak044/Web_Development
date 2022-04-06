import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap'

import Header from './components/Header';
import ReactBackground from './components/ReactBackground';
import ScrollToTop from './components/ScrollToTop';

import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Post from './Pages/Post';

function App() {
  const [login, setLogin] = useState(false)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Button onClick={() => setLogin(!login)}>{login ? `Logout` : `Login`}</Button>
        {/* <button onClick={() => setLogin(!login)}>{login ? `Logout` : `Login`}</button> */}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/profile'>
            <Profile login={login} />
          </Route>
          <Route path='/post/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </div >
      <ReactBackground />
    </BrowserRouter>
  );
}

export default App;
