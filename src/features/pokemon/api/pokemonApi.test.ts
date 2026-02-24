import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemonApi";
import { setupServer } from "msw/node";
import { http } from "msw";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return new Response(
      JSON.stringify({
        results: [{ name: "bulbasaur" }, { name: "charmander" }],
      }),
      { status: 200 }
    );
  }),
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

describe("pokemonApi", () => {
  it("should fetch pokemon list successfully", async () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemon.initiate(undefined)
    );

    expect(result.data?.results.length).toBe(2);
  });

  it("should fetch pokemon details successfully", async () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetails.initiate("bulbasaur")
    );

    expect(result.data?.name).toBe("bulbasaur");
  });
});
