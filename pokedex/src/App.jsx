import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pokedex from "./Pokedex";
import PokemonDetail from "./PokemonDetail";

function App() {
  return (
    <Router>
      <nav>
        <p>Press on home button if you cannot see the pokemons</p>
        <Link id="home" to="/Assignment2React">Home</Link> 
        <p><b>click on the pokemons to see more details </b></p>
      </nav>
      <Routes>
        <Route path="/Assignment2React" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
