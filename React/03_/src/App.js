import { useState, useEffect } from 'react'
import './App.css';

// import FlipNumber from './components/FlipNumber'

function App() {
  const [trueCounter, setTrueCounter] = useState(0)
  const [displayedCounter, setDisplayedCounter] = useState(0)

  // Default value to 0 when page reloads
  useEffect(() => {
    setTrueCounter(0)
  }, [])

  const handleClickIncrease = () => {
    setTrueCounter(trueCounter + 1)
  }

  const handleClickDecrease = () => {
    setTrueCounter(trueCounter - 1)
  }

  const handleReset = () => {
    setTrueCounter(0)
  }

  let activateLoop = false;

  const delayToGoal = () => {
    activateLoop = false
    activateLoop = true

    if (displayedCounter < trueCounter) {
      while (activateLoop && displayedCounter < trueCounter) {
        setTimeout(() => {
          setDisplayedCounter(displayedCounter + 1)
        }, 100);
      }
      // Promise to set activateLoop back to false when while loop completes
    } else if (displayedCounter > trueCounter) {
      while (activateLoop && displayedCounter > trueCounter) {
        setTimeout(() => {
          setDisplayedCounter(displayedCounter - 1)
        }, 100);
      }
    }
  }

  return (
    <div className='App'>
      <div>
        <h1>{`Ending Number: ${trueCounter}`}</h1>
        <button onClick={handleClickIncrease}>+</button>
        <button onClick={handleClickDecrease}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        <h1>{displayedCounter}</h1>
        <button onClick={delayToGoal}>Animate to ending number</button>
      </div>
    </div>
  );
}

export default App;
