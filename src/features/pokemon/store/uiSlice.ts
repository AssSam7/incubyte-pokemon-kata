import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters, FilterKey, initialFilters } from "../types/filters";

type PokemonUIState = {
  searchText: string;
  filters: Filters;
  pageOffset: number;
};

const initialState: PokemonUIState = {
  searchText: "",
  filters: initialFilters,
  pageOffset: 0,
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
      const { key, value } = action.payload;

      // MULTI SELECT FILTERS
      if (key === "type" || key === "ability") {
        const current = state.filters[key];

        if (!current) {
          state.filters[key] = value;
          return;
        }

        const values = current.split(",");

        const exists = values.includes(value);

        if (exists) {
          // remove value
          state.filters[key] = values.filter((v) => v !== value).join(",");
        } else {
          // add value
          state.filters[key] = [...values, value].join(",");
        }

        return;
      }

      // SINGLE SELECT FILTERS (sort, height etc.)
      state.filters[key] = value;
    },

    setPageOffset(state, action: PayloadAction<number>) {
      state.pageOffset = action.payload;
    },

    resetFilters(state) {
      state.filters = initialFilters;
    },

    clearAllFilters(state) {
      state.filters = {
        ...state.filters,
        type: "",
        ability: "",
      };
    },
  },
});

export const {
  setSearchText,
  setFilters,
  setPageOffset,
  resetFilters,
  clearAllFilters,
} = pokemonUISlice.actions;

export default pokemonUISlice.reducer;
