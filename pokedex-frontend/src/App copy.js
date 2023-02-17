
import React, {useEffect,useState} from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import SearchBar from "./Components/SearchBar/SearchBar";
import Pokedex from "./Components/Pokedex/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";


function App() {
 
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const itensPerPage = 25;
 
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemon(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };
  useEffect(() =>{
    fetchPokemons()
  },[])
  
  useEffect(() => {
    fetchPokemons();
  }, [page]);




  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)

    const result = await searchPokemon(pokemon)
    if(!result) {
   setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)

  }
  return (
    <div>
      <NavBar />
      <SearchBar onSearch={onSearchHandler}/>
      {notFound ? (
          <div class-name="not-found-text"> Meteu essa?! </div>
        ) : 
        (<Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />)}
    </div>
  );
}

export default App;
