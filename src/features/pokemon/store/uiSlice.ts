import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters, FilterKey, initialFilters } from "../types/filters";

type PokemonUIState = {
  searchText: string;
  filters: Filters;
};

const initialState: PokemonUIState = {
  searchText: "",
  filters: initialFilters,
};

const pokemonUISlice = createSlice({
  name: "pokemonUI",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<{ key: FilterKey; value: string }>
    ) {
      state.filters[action.payload.key] = action.payload.value;
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
    clearAllFilters(state) {
      state.filters = { ...state.filters, type: "", ability: "" };
    },
  },
});

export const { setSearchText, setFilters, resetFilters, clearAllFilters } =
  pokemonUISlice.actions;

export default pokemonUISlice.reducer;
