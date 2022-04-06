import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About'
import Forum from './Components/Forum'
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Forum' element={<Forum/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
