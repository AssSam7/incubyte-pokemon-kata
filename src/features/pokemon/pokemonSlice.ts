import { createSlice } from "@reduxjs/toolkit";

export type PokemonState = {
  items: unknown[];
  loading: boolean;
  error: string | null;
};

const initialState: PokemonState = {
  items: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
});

export default pokemonSlice.reducer;
