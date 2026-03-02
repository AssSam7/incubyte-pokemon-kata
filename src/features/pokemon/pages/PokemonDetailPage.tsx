import { useNavigate, useParams } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonDetailPage.module.scss";

import PokemonHero from "../components/detail/PokemonHero";
import PokemonTabs from "../components/detail/PokemonTabs";
import { ArrowLeft } from "lucide-react";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = pokemonApi.useGetPokemonDetailsQuery(
    name ?? ""
  );
  const { data: species } = pokemonApi.useGetPokemonSpeciesQuery(name ?? "");

  if (isLoading) return <p className={styles.state}>Loading...</p>;
  if (isError || !data) return <p className={styles.state}>Error loading</p>;

  return (
    <div className={styles.pageWrapper}>
      <header>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={28} color="#636e72" />
        </button>
        <h1>
          Pokédex
          <span className={styles.redDot} />
        </h1>
      </header>
      <div className={styles.detailContainer}>
        <PokemonHero pokemon={data} />
        <PokemonTabs pokemon={data} species={species} />
      </div>
    </div>
  );
}
