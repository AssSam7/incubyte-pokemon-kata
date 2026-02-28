import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type EnrichedPokemon = {
  id: number;
  formattedId: string;
  name: string;
  image: string;
  types: string[];
  ability?: string;
  height?: number;
};

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
    getPokemonListWithDetails: builder.query<EnrichedPokemon[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        // 1️⃣ Fetch list
        const listResult = await baseQuery("https://pokeapi.co/api/v2/pokemon");

        if (listResult.error) {
          return { error: listResult.error };
        }

        const listData = listResult.data as {
          results: { name: string }[];
        };

        // 2️⃣ Fetch details in parallel
        const enriched = await Promise.all(
          listData.results.map(async (pokemon) => {
            const detailResult = await baseQuery(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );

            if (detailResult.error) {
              throw detailResult.error;
            }

            const detail = detailResult.data as any;

            return {
              id: detail.id,
              formattedId: `N°${String(detail.id).padStart(3, "0")}`,
              name: detail.name.charAt(0).toUpperCase() + detail.name.slice(1),
              image: detail.sprites.other["official-artwork"].front_default,
              types: detail.types.map(
                (t: any) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
              ),
              ability: detail.abilities?.[0]?.ability?.name
                ? detail.abilities[0].ability.name
                    .replace("-", " ")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase())
                : undefined,
              height: detail.height,
            };
          })
        );

        return { data: enriched };
      },
    }),
  }),
});
