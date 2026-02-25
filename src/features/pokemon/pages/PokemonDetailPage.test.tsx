import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { setupServer } from "msw/node";
import { http } from "msw";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../pokemonSlice";
import { pokemonApi } from "../api/pokemonApi";
import PokemonDetailPage from "./PokemonDetailPage";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
    return new Response(
      JSON.stringify({
        name: params.name,
        height: 7,
        weight: 69,
      }),
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function createTestStore() {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });
}

describe("PokemonDetailPage", () => {
  it("fetches and displays pokemon details", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText(/height/i)).toBeInTheDocument();
      expect(screen.getByText(/weight/i)).toBeInTheDocument();
    });
  });
});
