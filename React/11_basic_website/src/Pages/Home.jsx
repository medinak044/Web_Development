import { useEffect } from "react"

const Home = () => {
    // Sets the scroll view all the way up
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <h1>Home Page</h1>
    )
}

export default Home