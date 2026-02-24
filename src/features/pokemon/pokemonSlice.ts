import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = pokemonSlice.actions;
export default pokemonSlice.reducer;
