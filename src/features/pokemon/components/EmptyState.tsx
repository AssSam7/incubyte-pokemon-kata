import styles from "./EmptyState.module.scss";

type Props = {
  searchText: string;
  onSearch: (value: string) => void;
};

export default function EmptyState({ searchText, onSearch }: Props) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.pokeball}>
        <div className={styles.center} />
      </div>

      <h3>No Pokémon Found</h3>

      <p>
        We couldn’t find any Pokémon matching <span>"{searchText}"</span>, Try:{" "}
        <button
          className={styles.tryPokemon}
          onClick={() => onSearch("bulbasaur")}
        >
          bulbasaur
        </button>{" "}
        or{" "}
        <button
          className={styles.tryPokemon}
          onClick={() => onSearch("charmander")}
        >
          charmander
        </button>
      </p>

      <button className={styles.clearButton} onClick={() => onSearch("")}>
        Clear Search
      </button>
    </div>
  );
}
