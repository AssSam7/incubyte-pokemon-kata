import { Link } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonListPage.module.scss";

export default function PokemonListPage() {
  const { data, isLoading } = pokemonApi.useGetPokemonQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>
          Pokédex
          <span className={styles.redDot} />
        </h1>

        <div className={styles.heroAccent} />

        <h2>Search and explore Pokémon</h2>
      </header>

      <div className={styles.grid}>
        {data?.results.map((pokemon, index) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.name}`}
            className={styles.card}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={pokemon.name}
              className={styles.sprite}
            />

            <span className={styles.id}>
              N°{String(index + 1).padStart(3, "0")}
            </span>

            <h3 className={styles.name}>{pokemon.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
