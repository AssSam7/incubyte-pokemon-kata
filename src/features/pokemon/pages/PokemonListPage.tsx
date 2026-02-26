import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonListPage.module.scss";
import { Search } from "lucide-react";
import { PokemonList } from "../components";
import PokemonListSkeleton from "../components/PokemonListSkeleton";

export default function PokemonListPage() {
  const { data, isLoading } = pokemonApi.useGetPokemonListWithDetailsQuery();

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

      <div className={styles.searchBar}>
        <input type="search" placeholder="Search your Pokemon!" />
        <button className={styles.searchButton}>
          <Search size={24} color="white" strokeWidth={2.75} />
        </button>
      </div>

      {isLoading && !data ? (
        <PokemonListSkeleton />
      ) : (
        <PokemonList pokemons={data || []} />
      )}
    </div>
  );
}
