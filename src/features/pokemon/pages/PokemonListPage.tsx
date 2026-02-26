import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonListPage.module.scss";
import { Search } from "lucide-react";
import { PokemonList } from "../components";
import PokemonListSkeleton from "../components/PokemonListSkeleton";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";

export default function PokemonListPage() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = pokemonApi.useGetPokemonListWithDetailsQuery();

  const filteredProductList = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

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
        <input
          type="search"
          placeholder="Search your Pokemon!"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className={styles.searchButton}>
          <Search size={24} color="white" strokeWidth={2.75} />
        </button>
      </div>

      {isLoading && !data ? (
        <PokemonListSkeleton />
      ) : filteredProductList.length === 0 ? (
        <EmptyState searchText={searchText} onSearch={setSearchText} />
      ) : (
        <PokemonList pokemons={filteredProductList} />
      )}
    </div>
  );
}
