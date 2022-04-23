import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  const increment = () => {
    setCounter(prev => prev + 1)
  }

  const decrement = () => {
    setCounter(prev => prev - 1)
  }

  useEffect(() => {
    console.log(counter)
  }, [counter])


  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
