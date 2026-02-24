import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

describe("pokemon slice", () => {
  it("should return the initial state", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    const state = store.getState().pokemon;

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });
});
