import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonListPage.module.scss";
import { Search } from "lucide-react";
import { PokemonList } from "../components";
import { PokemonCardData } from "../types";

export default function PokemonListPage() {
  const { data, isLoading } = pokemonApi.useGetPokemonQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pokemonsData: PokemonCardData[] =
    data?.results.map((pokemon, index) => ({
      id: index + 1,
      slug: pokemon.name,
      name: pokemon.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
      nId: `N°${String(index + 1).padStart(3, "0")}`,
      types: ["Ground", "Fire"],
    })) ?? [];

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

      {pokemonsData?.length > 0 && <PokemonList pokemons={pokemonsData} />}
    </div>
  );
}
