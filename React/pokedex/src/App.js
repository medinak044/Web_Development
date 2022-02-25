import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use "Hashrouter" for hosting on GitHub

import Dashboard from './components/layout/Dashboard';
import NavBar from './components/layout/NavBar';
import backGroundImage from './pattern.png';
import Pokemon from './components/pokemon/Pokemon'

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="App" style={{ background: `url(${backgroundImage})` }}>
//           <NavBar />
//           <div className="container">
//             <Switch>
//               <Route exact path="/" component={Dashboard} />
//               <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
//             </Switch>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }
function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backGroundImage})` }}>
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
