import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import heroesArr from './resources/hero.json'


import HomePage from './pages/HomePage';

function App() {
  const [heroName, setHeroName] = useState("")

  const greeting = "Welcome to the FEH Hero Search"

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  const findHero = (num) => {
    // Filter result by "hero_id"
    // Return hero obj
    // let randNum = randomIntFromInterval(1, 329)
    for (let i = 0; i < heroesArr.length; i++) {
      if (heroesArr[i].hero_id === num) { return heroesArr[i] }
    }
  }

  const handleSubmitRandomHero = () => {
    setHeroName(findHero(randomIntFromInterval(1, 329)).name)
  }

  const handleClick = () => {
    // battleSimulation(insert 2 random hero objs)
  }

  // Too many heroes to display at once, use pagination and limiting
  return (
    <div className="App">
      <h1>{greeting}</h1>
      <HomePage />
      <p>{heroesArr.length} Heroes</p>
      <p>{heroName}</p>
      <button onClick={handleSubmitRandomHero}>Random Hero!</button>
      <button onClick={handleClick}>Random Battle!</button>
      {/* <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes> */}
    </div>
  );
}

export default App;
