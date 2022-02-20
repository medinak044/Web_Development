import { useState } from 'react';
import './App.css';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([`bulbasaur`, `charmander`])

  return (
    <div className="App">
      <PokemonList
        pokemon={pokemon}
      />
    </div>
  );
}

export default App;
