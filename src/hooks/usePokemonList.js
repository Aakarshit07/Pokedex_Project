import { useState, useEffect } from "react";
import axios from "axios";
function usePokemonList(type) {
    
    const  [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
        nextUrl: "",
        prevUrl: "",

    })

    async function downloadPokemons() {

        setPokemonListState((state) => ({...state, isLoading: true}));

        //  this downloads list of 20 pokemons
        const response = await axios.get(pokemonListState.pokedexUrl) 
        
        //  we get the array of pokemons from result
        const pokemonResults = response.data.results 
        
        //  queing the state update problem occored that react updated a final state when there are mutipal
        //  update staes. and to updated multiple date we used callback method that expects a object and when we do 
        //  tis it quests the state update. 
        setPokemonListState((state) => ({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));

        //  iterating over the array of pokemons, and using their url, to create an array of promises
        //  that will  download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
    
        //  passing that promise array to axios to axios.all 
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        //  console.log(pokemonData);
        
        
        //  now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        console.log(pokeListResult)
        
        //  queing the state update 
        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult, 
            isLoading: false
        }));
    
        
    
    }

    useEffect( () => {
       downloadPokemons();
    }, [pokemonListState.pokedexUrl])
    
    return [pokemonListState, setPokemonListState];

}

export default usePokemonList;