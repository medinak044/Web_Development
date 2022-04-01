import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCounter(0)
  }, [])

  const incrementInterval = 1
  const decrementInterval = 1

  const increment = () => {
    setCounter(counter + 1)
  }

  const decrement = () => {
    setCounter(counter - 1)
  }

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={increment}>+{incrementInterval}</button>
      <button onClick={decrement}>-{decrementInterval}</button>
    </div>
  )
}

export default App;
