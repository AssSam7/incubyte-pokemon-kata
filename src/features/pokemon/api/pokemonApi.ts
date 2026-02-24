import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query<{ results: { name: string }[] }, void>({
      query: () => "pokemon",
    }),
    getPokemonDetails: builder.query<
      { name: string; height: number; weight: number },
      string
    >({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
