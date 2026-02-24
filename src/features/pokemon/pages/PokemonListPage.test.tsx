import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { setupServer } from "msw/node";
import { http } from "msw";
import PokemonListPage from "./PokemonListPage";

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
    render(
      <Provider store={store}>
        <PokemonListPage />
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
