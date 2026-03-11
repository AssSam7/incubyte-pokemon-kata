import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { pokemonApi } from "../api/pokemonApi";
import { useMemo } from "react";

export default function usePokemonListPageData() {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.pokemonUI.searchText);
  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const pageOffset = useAppSelector((state) => state.pokemonUI.pageOffset);

  const { data, isLoading, refetch } =
    pokemonApi.useGetPokemonListWithDetailsQuery({
      offset: pageOffset,
    });

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

  return {
    dispatch,
    searchText,
    filters,
    processedList,
    isLoading,
    data,
  };
}
