import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

export default function Homepage() {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(second)

    const getPokemon = async (id) => {
        // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // return res
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <div>

        </div>
    )
}
