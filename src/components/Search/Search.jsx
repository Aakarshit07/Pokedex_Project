import "./Search.css"

function Search() {
    return(
        <div className="search-Wrapper">
            <input 
                type="text" 
                placeholder="Pokemon name..."
                id="pokemon-name-search"
            />
        </div>
    )

}

export default Search;