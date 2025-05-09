import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Pokemondetail.css";
function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div id="pokemon-detail">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>Height: {pokemon.height}</p>
    
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default PokemonDetail;
