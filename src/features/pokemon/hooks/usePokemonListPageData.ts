import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { pokemonApi } from "../api/pokemonApi";
import { useEffect, useMemo, useRef } from "react";
import { setPageOffset } from "../store/uiSlice";

export default function usePokemonListPageData() {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.pokemonUI.searchText);
  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const pageOffset = useAppSelector((state) => state.pokemonUI.pageOffset);

  const { data, isLoading, isFetching } =
    pokemonApi.useGetPokemonListWithDetailsQuery({
      offset: pageOffset,
    });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const processedList = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    if (searchText) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filters.type) {
      list = list.filter((p) =>
        p.types.some(
          (type) => type.toLowerCase() === filters.type.toLowerCase()
        )
      );
    }

    if (filters.ability) {
      list = list.filter(
        (p) =>
          p.ability && p.ability.toLowerCase() === filters.ability.toLowerCase()
      );
    }

    if (filters.height === "height_asc") {
      list.sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
    }

    if (filters.height === "height_desc") {
      list.sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
    }

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

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isFetching) {
          dispatch(setPageOffset(pageOffset + 20));
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [dispatch, pageOffset, isFetching]);

  return {
    dispatch,
    searchText,
    filters,
    processedList,
    isLoading,
    isFetching,
    data,
    loadMoreRef,
  };
}
