import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pokedex from "./Pokedex";
import PokemonDetail from "./PokemonDetail";
import "./App.css"; 

function App() {
  return (
    <Router>
      <nav>
        <Link id="home" to="/">Home</Link> 
        <p><b>click on the pokemons to see more details </b></p>
      </nav>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
