import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer, { setLoading } from "./pokemonSlice";

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

  it("should set loading to true when setLoading is dispatched", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    store.dispatch(setLoading(true));

    const state = store.getState().pokemon;

    expect(state.loading).toBe(true);
  });
});
