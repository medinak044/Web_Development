import { useState, useEffect } from 'react'
import './App.css';
import MovieCard from './components/MovieCard';

import SearchIcon from './search.svg'

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const API_KEY = `f0e98f2a`
  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }


  useEffect(() => {
    searchMovies("Batman")
  }, [])

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder='Search for movies'
          value={searchTerm}
          onChange={(e => setSearchTerm(e.target.value))}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

    </div>
  );
}

export default App;
