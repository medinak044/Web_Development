import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [dataStr, setDataStr] = useState('')
  const [userObjArr, setUserObjArr] = useState([])
  const [nextPage, setNextPage] = useState(1)

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
    const res = await fetchRandomData(nextPage)
    if (!res) return
    // setDataStr(JSON.stringify(res.data.results, null, 2))
    setUserObjArr([...userObjArr, ...res.data.results])
    setNextPage(nextPage + 1) // Reset page
  }

  // On page load
  useEffect(() => {
    async function fetchData() {
      // Using default values to ensure only one user is displayed
      const res = await fetchRandomData(nextPage)

      // setDataStr(JSON.stringify(res.data.results, null, 2))
      setUserObjArr([...res.data.results])
      setNextPage(nextPage + 1) // Reset page
    }
    fetchData()
  }, [])

  const displayFullData = (userObj) => {
    return (
      <div key={userObj.id.value}>
        <h1>Name: {`${userObj.name.first} ${userObj.name.last}`}</h1>
        <img src={userObj.picture.large} alt="User profile picture" />
        {/* <details>
          <summary>JSON ({`${userObj.name.first} ${userObj.name.last}`})</summary>
          <pre>{dataStr}</pre>
        </details> */}
      </div>
    )
  }

  return (
    <>
      {userObjArr.map(userObj => displayFullData(userObj))}
      <button onClick={fetchNextUser}>Load more users (X)</button>
    </>
  )
}

export default App;
