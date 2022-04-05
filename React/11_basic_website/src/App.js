import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReactBackground from './components/ReactBackground';

import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div >
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} />
      </Switch>
      <ReactBackground />
    </BrowserRouter>
  );
}

export default App;
