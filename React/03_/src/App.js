import { useState } from 'react'
import './App.css';

function App() {
  const [counter, setCounter] = useState(0)

  const handleClickIncrease = () => {
    setCounter(counter + 1)
  }

  const handleClickDecrease = () => {
    setCounter(counter - 1)
  }

  const handleReset = () => {
    setCounter(0)
  }

  return (
    <div className='App'>
      <h1>{counter}</h1>
      <button onClick={handleClickIncrease}>+</button>
      <button onClick={handleClickDecrease}>-</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
