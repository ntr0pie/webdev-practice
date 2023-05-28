import PokemonList from "./PokemonList";
import { useState } from 'react'

function App() {
  const [pokemons, setPokemons] = useState(["bulbasaur", "charmander"]);
  return (
    <PokemonList pokemons={pokemons} />
  );
}

export default App;
