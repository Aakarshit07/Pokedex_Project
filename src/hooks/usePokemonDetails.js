import { useState, useEffect } from "react";
import axios from "axios";

function usePokemonDetails(id, pokemonName) {

    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {

        try {
            let response;
            if(pokemonName) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const pokemonOfSameType = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ""}`)
            setPokemon( state => ({
                ...state,
                name: response.data.name, 
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                type: response.data.types.map((t) => t.type.name),
                similarPokemons: pokemonOfSameType.data.pokemon

            }));
            setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : ""});
        } catch (error) {
            console.log("Something Went Wrong..");
        }
       
    }
    const [pokemonListState, setPokemonListState] = useState({});   



    useEffect(() => {
        downloadPokemon();
    }, []) 

    return [pokemon];


}

export default usePokemonDetails; 
