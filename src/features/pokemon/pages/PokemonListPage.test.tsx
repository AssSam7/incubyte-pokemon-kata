import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
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
  // 1️⃣ List endpoint
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return Response.json({
      results: [{ name: "bulbasaur" }, { name: "charmander" }],
    });
  }),

  // 2️⃣ Details endpoint - Bulbasaur
  http.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", () => {
    return Response.json({
      id: 1,
      name: "bulbasaur",
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "bulbasaur.png",
          },
        },
      },
    });
  }),

  // 3️⃣ Details endpoint - Charmander
  http.get("https://pokeapi.co/api/v2/pokemon/charmander", () => {
    return Response.json({
      id: 4,
      name: "charmander",
      types: [{ type: { name: "fire" } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "charmander.png",
          },
        },
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PokemonListPage - enriched list", () => {
  it("renders pokemon cards with id and real types", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    // Wait for enriched rendering

    // Capitalized name
    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Charmander")).toBeInTheDocument();

    // Padded ID
    expect(screen.getByText("N°001")).toBeInTheDocument();
    expect(screen.getByText("N°004")).toBeInTheDocument();

    // Real types
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });
});
