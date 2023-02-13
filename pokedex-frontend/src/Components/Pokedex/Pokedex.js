import React from "react";
import { PokedexHeader, PokedexGrid } from "./style";


const Pokedex = (props) => {
  const {pokemons,loading} = props
  return (
    <PokedexHeader>
      <h1>Pokedex</h1>
      <div>Paginação</div>
    </PokedexHeader>
  );
};

export default Pokedex;
