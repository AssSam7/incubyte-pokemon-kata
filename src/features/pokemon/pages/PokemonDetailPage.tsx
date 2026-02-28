import { useParams } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonDetailPage.module.scss";

import PokemonHero from "../components/detail/PokemonHero";
import PokemonTabs from "../components/detail/PokemonTabs";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();

  const { data, isLoading, isError } = pokemonApi.useGetPokemonDetailsQuery(
    name ?? ""
  );

  if (isLoading) return <p className={styles.state}>Loading...</p>;
  if (isError || !data) return <p className={styles.state}>Error loading</p>;

  return (
    <div className={styles.container}>
      <PokemonHero pokemon={data} />
      <PokemonTabs pokemon={data} />
    </div>
  );
}
