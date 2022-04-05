import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import ReactBackground from './components/ReactBackground';
import ScrollToTop from './components/ScrollToTop';

import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Post from './Pages/Post';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/profile' component={Profile} />
          <Route path='/post/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </div >
      <ReactBackground />
    </BrowserRouter>
  );
}

export default App;
