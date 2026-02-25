import { Link } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";

import "./PokemonListPage.module";

export default function PokemonListPage() {
  const { data, isLoading } = pokemonApi.useGetPokemonQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      {data && (
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
