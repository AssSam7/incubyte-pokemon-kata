import { EnrichedPokemon } from "../api/pokemonApi";

import PokemonCard from "./PokemonCard";
import styles from "./PokemonList.module.scss";

export default function PokemonList({
  pokemons,
}: {
  pokemons: EnrichedPokemon[];
}) {
  return (
    <div className={styles.cardList}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          img={pokemon.image}
          nId={pokemon.formattedId}
          name={pokemon.name}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}
