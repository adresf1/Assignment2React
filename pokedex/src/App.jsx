import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./app.css";

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
    <div >
      <h1>Pokédex</h1>
      <div id="pokemons">
        {pokemonList.map((pokemon) => (
          <div  onClick={() => navigate(`/pokemon/${pokemon.name}`)} 
           id="list" key={pokemon.name} style={{ margin: 10 }}>
            <img src={pokemon.sprite} alt={pokemon.name} />
              <p id="name"><b>{pokemon.name}</b></p>
          </div>
        ))}
      </div>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

function PokemonDetail() { // ✅ FIXED: Renamed from `DetalisOfPokemeon`
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
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

function About() {
  return <h1>About This Pokédex</h1>;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} /> {/* ✅ FIXED: Correct component name */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
