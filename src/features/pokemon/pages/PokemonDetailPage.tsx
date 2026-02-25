import { useParams } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";

export default function PokemonDetailPage() {
  const { name } = useParams();

  if (!name) {
    return null;
  }

  const { data, isLoading } = pokemonApi.useGetPokemonDetailsQuery(name);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
}
