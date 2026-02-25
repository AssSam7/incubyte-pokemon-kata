import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupServer } from "msw/node";
import { http } from "msw";
import PokemonListPage from "./PokemonListPage";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../pokemonSlice";
import { pokemonApi } from "../api/pokemonApi";
import { MemoryRouter } from "react-router-dom";

function createTestStore() {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });
}

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return new Response(
      JSON.stringify({
        results: [{ name: "bulbasaur" }, { name: "charmander" }],
      }),
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PokemonListPage", () => {
  it("renders pokemon list after successful fetch", async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    // loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // wait for data
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
    });
  });
});
