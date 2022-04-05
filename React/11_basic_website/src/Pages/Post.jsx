import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Post = () => {
    const { id } = useParams()

    const query = new URLSearchParams(useLocation().search) // http://localhost:3000/post/doggyId?first=doggy&last=horse

    return (
        <>
            <h2>Id is: {id}</h2>
            <h2>{query.get(`first`)}</h2>
            <h2>{query.get(`last`)}</h2>
        </>
    )
}

export default Post