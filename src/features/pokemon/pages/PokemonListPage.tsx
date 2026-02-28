import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonListPage.module.scss";
import { Search } from "lucide-react";
import { PokemonList } from "../components";
import PokemonListSkeleton from "../components/PokemonListSkeleton";
import EmptyState from "../components/EmptyState";
import ActionToolbar from "../components/ActionToolbar";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSearchText } from "../store/uiSlice";

export default function PokemonListPage() {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.pokemonUI.searchText);

  const filters = useAppSelector((state) => state.pokemonUI.filters);

  const { data, isLoading } = pokemonApi.useGetPokemonListWithDetailsQuery();

  const processedList = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    // 🔎 SEARCH
    if (searchText) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 🏷 TYPE FILTER
    if (filters.type) {
      list = list.filter((p) =>
        p.types.some(
          (type) => type.toLowerCase() === filters.type.toLowerCase()
        )
      );
    }

    // ✨ ABILITY FILTER
    if (filters.ability) {
      list = list.filter(
        (p) =>
          p.ability && p.ability.toLowerCase() === filters.ability.toLowerCase()
      );
    }

    // 📏 HEIGHT SORT
    if (filters.height === "height_asc") {
      list.sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
    }

    if (filters.height === "height_desc") {
      list.sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
    }

    // 🔢 ID / NAME SORT
    switch (filters.sortBy) {
      case "id_asc":
        list.sort((a, b) => a.id - b.id);
        break;

      case "id_desc":
        list.sort((a, b) => b.id - a.id);
        break;

      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name_desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return list;
  }, [data, searchText, filters]);

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
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <button className={styles.searchButton}>
          <Search size={24} color="white" strokeWidth={2.75} />
        </button>
      </div>

      <ActionToolbar />

      {isLoading && !data ? (
        <PokemonListSkeleton />
      ) : processedList.length === 0 ? (
        <EmptyState
          searchText={searchText}
          onSearch={(val) => dispatch(setSearchText(val))}
        />
      ) : (
        <PokemonList pokemons={processedList} />
      )}
    </div>
  );
}
