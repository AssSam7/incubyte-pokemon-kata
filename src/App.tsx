import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonListPage from "./features/pokemon/pages/PokemonListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route
          path="/pokemon/:name"
          element={<div>Pokemon Details Page</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
