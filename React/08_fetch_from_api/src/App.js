import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [dataStr, setDataStr] = useState('')
  const [dataObjArr, setDataObjArr] = useState([])

  // Best practice: Set api logic in another component
  const fetchRandomData = () => {
    axios.get('https://randomuser.me/api')
      .then(res => {
        // console.log(res.data)
        setDataObjArr(res.data.results)
        setDataStr(JSON.stringify(res.data.results, null, 2))
      })
      .catch(err => { console.log(err) })
  }

  // On page load
  useEffect(() => {
    async function fetchData() {
      const response = await setDataStr(await fetchRandomData())
    }
    fetchData()
  }, [])

  const displayFullUserName = (userObj) => {
    return (
      <div key={userObj.id.value}>
        <h1>Name: {`${userObj.name.first} ${userObj.name.last}`}</h1>
        <img src={userObj.picture.large} alt="User profile picture" />
      </div>
    )
  }

  return (
    <>
      {/* {dataObjArr ? <h1>Name: {`${dataObjArr.name.first} ${dataObjArr.name.last}`}</h1>
        : null} */}
      {dataObjArr.map(userObj => displayFullUserName(userObj))}
      {/* <img src={dataObjArr.picture.large} alt="User profile picture" /> */}
      <pre>{dataStr}</pre>
    </>
  );
}

export default App;
