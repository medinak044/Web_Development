import React, { Component } from 'react'
import axios from 'axios'

export default class Pokemon extends Component {
    state = {
        name: ``,
        pokemonIndex: ``,
        imageUrl: ``,
    }

    componentDidMount() {
        const { pokemonIndex } = this.props.match.params

        // Urls for pokemon information
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        // Get pokemon information
        const pokemonRes = axios.get(pokemonUrl)
        const name = pokemonRes.data.name
        this.setState({ name: name })
    }
    // async componentDidMount() {
    //     const { pokemonIndex } = this.props.match.params

    //     // Urls for pokemon information
    //     const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
    //     const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

    //     // Get pokemon information
    //     const pokemonRes = await axios.get(pokemonUrl)
    //     const name = pokemonRes.data.name
    //     this.setState({ name: name })
    // }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        )
    }
}
