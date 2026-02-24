import { store } from "./store";
import { pokemonApi } from "../features/pokemon/api/pokemonApi";

describe("store configuration", () => {
  it("should include pokemonApi reducer", () => {
    const state = store.getState();

    expect(state[pokemonApi.reducerPath]).toBeDefined();
  });

  it("should include pokemon slice reducer", () => {
    const state = store.getState();

    expect(state.pokemon).toBeDefined();
  });
});
