import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [text, setText] = useState('')

  // Best practice: Set api logic in another component
  const fetchRandomData = () => {
    axios.get('https://randomuser.me/api')
      .then(res => {
        console.log(res.data)
        setText(JSON.stringify(res.data, null, 2))
      })
      .catch(err => { console.log(err) })
  }

  // On page load
  useEffect(() => {
    async function fetchData() {
      const response = await setText(await fetchRandomData())
    }
    fetchData()
  }, [])

  return (
    <>
      <pre>{text}</pre>
    </>
  );
}

export default App;
