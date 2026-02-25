import { pokemonApi } from "../api/pokemonApi";

export default function PokemonListPage() {
  const { data, isLoading } = pokemonApi.useGetPokemonQuery();

  return (
    <div>
      <h1>Pokemon List</h1>
      {isLoading && <div>Loading...</div>}
      {data && (
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
