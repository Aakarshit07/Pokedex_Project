import useDebounce from "../../hooks/useDebounce";
import "./Search.css"

function Search({updateSearchTerm}) {

  const debouncedCallback =  useDebounce((e) => updateSearchTerm(e.target.value))

    return(
        <div className="search-Wrapper">
            <input 
                type="text" 
                placeholder="Pokemon name..."
                id="pokemon-name-search"
                onChange={(e) => debouncedCallback(e, "123")}
            />
            
        </div>
    )

}

export default Search;