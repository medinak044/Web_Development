import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

// Components
import Pokemon from '../components/Pokemon'
import Loader from '../components/Loader'

export default function Homepage() {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    const getPokemonList = async () => {
        let pokemonArr = []
        for (let i = 1; i < 151; i++) {
            pokemonArr.push(await getPokemonData(i))
        }
        console.log(pokemonArr)
        setPokemon(pokemonArr)
        setLoading(false)
    }

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return res
        // return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }

    useEffect(() => {
        getPokemonList()
    }, [])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    {pokemon.map(p => (
                        <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Pokemon pokemon={p.data} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}
