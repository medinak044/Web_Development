import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import PokemonList from './PokemonList';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon`)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // Page hasn't displayed elements at this point
    let cancel

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false) // Page has now displayed elements
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })

    return () => cancel() // Cancels the previous request so we don't get old data
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrrentPageUrl(prevPageUrl)
  }

  if (loading) return `Loading...`

  return (
    <div className="App">
      <PokemonList
        pokemon={pokemon}
      />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
}

export default App;
