import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// Pages
import HomePage from './pages/Homepage.js'

function App() {
  return (
    <Router>
      <Container>
        <Route exact path='/' component={HomePage} />
      </Container>
    </Router>
  );
}

export default App;
