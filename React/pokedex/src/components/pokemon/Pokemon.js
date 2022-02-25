import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Pokemon() {
    const [name, setName] = useState("")
    const [pokemonIndex, setPokemonIndex] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const params = useParams()

    useEffect(() => {
        // Urls for pokemon information
        let url = `https://pokeapi.co/api/v2`
        const pokemonUrl = `${url}/pokemon/${params.pokemonIndex}/`
        const pokemonSpeciesUrl = `${url}/pokemon-species/${params.pokemonIndex}/`

        // Get pokemon information
        axios.get(pokemonUrl)
            .then(pokemonRes => {
                let { data } = pokemonRes
                setName({
                    name: data.name
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
// export default class Pokemon extends Component {
//     state = {
//         name: ``,
//         pokemonIndex: ``,
//         imageUrl: ``,
//     }

//     async componentDidMount() {
//         const { pokemonIndex } = this.props.match.params

//         // Urls for pokemon information
//         const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
//         const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

//         // Get pokemon information
//         const pokemonRes = await axios.get(pokemonUrl)
//         const name = pokemonRes.data.name
//         this.setState({ name: name })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.state.name}</h1>
//             </div>
//         )
//     }
// }
