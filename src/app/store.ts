import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemon/store/pokemonSlice";
import { pokemonApi } from "../features/pokemon/api/pokemonApi";
import pokemonUIReducer from "../features/pokemon/store/uiSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonUI: pokemonUIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
