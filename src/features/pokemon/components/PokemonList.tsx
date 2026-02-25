import { PokemonCardData } from "../types";
import PokemonCard from "./PokemonCard";
import styles from "./PokemonList.module.scss";

export default function PokemonList({
  pokemons,
}: {
  pokemons: PokemonCardData[];
}) {
  return (
    <div className={styles.cardList}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          img={pokemon.img}
          nId={pokemon.nId}
          name={pokemon.name}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}
