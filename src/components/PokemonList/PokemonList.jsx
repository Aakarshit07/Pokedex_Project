import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {

    const [pokemonListState, setPokemonListState] = usePokemonList(false);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? "Loading..." : 
                  pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
            </div>   
            </div>
        </div>
    )
}

export default PokemonList;