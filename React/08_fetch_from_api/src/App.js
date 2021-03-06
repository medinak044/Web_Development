import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [dataStr, setDataStr] = useState('')
  const [userObjArr, setUserObjArr] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [interval, setInterval] = useState(1)

  const baseUrl = 'https://randomuser.me/api'

  // Best practice: Set api logic in another component
  const fetchRandomData = async (pageNum) => {
    try {
      const res = await axios.get(`${baseUrl}?page=${pageNum}`)
      return res
    } catch (err) { console.log(err) }

    // return axios.get(`${baseUrl}?page=${pageNum}`)
    //   .then(res => res)
    //   .catch(err => { console.log(err) })
  }

  const fetchNextUser = async () => {
    let tempArr = []

    for (let i = 0; i < interval; i++) {
      const res = await fetchRandomData(nextPage)
      tempArr.push(...res.data.results)
    }

    if (!tempArr) return // In case no more user data is found

    // setDataStr(JSON.stringify(res.data.results, null, 2))
    setUserObjArr([...userObjArr, ...tempArr])
    setNextPage(nextPage + 1) // Reset page
  }

  // On page load
  useEffect(() => {
    async function fetchData() {
      // Using default values to ensure only one user is displayed
      const res = await fetchRandomData(nextPage)

      // console.log(res.data.results[0].id)
      // setDataStr(JSON.stringify(res.data.results, null, 2))
      setUserObjArr([...res.data.results])
      setNextPage(nextPage + 1) // Reset page
    }
    fetchData()
  }, [])

  const displayFullData = (userObj) => {
    // For some reason, cannot access the value of the database id
    return (
      <div key={userObj.email}>
        <h1>Name: {`${userObj.name.first} ${userObj.name.last}`}</h1>
        <img src={userObj.picture.large} alt="User profile picture" />
        {/* <details>
          <summary>JSON ({`${userObj.name.first} ${userObj.name.last}`})</summary>
          <pre>{dataStr}</pre>
        </details> */}
      </div>
    )
  }

  const userList = userObjArr.map((userObj) => displayFullData(userObj))

  return (
    <>
      <button onClick={fetchNextUser}>Load more users (+{interval})</button>
      <button onClick={() => { setInterval(interval + 1) }}>Increase load interval</button>
      {userList}
    </>
  )
}

export default App;
