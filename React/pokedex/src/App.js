import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use "Hashrouter" for hosting on GitHub

import Dashboard from './components/layout/Dashboard';
import NavBar from './components/layout/NavBar';
import backgroundImage from './pattern.png';
import Pokemon from './components/pokemon/Pokemon'

function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/pokemon/:pokemonIndex" element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
