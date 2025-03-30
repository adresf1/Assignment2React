import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; 

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * 12}`)
      .then(response => response.json())
      .then(async (data) => {
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const details = await response.json();
            return { ...pokemon, sprite: details.sprites.front_default };
          })
        );
        setPokemonList(detailedPokemon);
      });
  }, [page]);

  return (
    <div>
      <h1>Pokédex</h1>
      <div id="pokemons">
        {pokemonList.map((pokemon) => (
          <div id="list" onClick={() => navigate(`/pokemon/${pokemon.name}`)} key={pokemon.name}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p><b>{pokemon.name}</b></p>
          </div>
        ))}
      </div>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default Pokedex;