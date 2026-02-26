import PokemonCardSkeleton from "./PokemonCardSkeleton";
import styles from "./PokemonList.module.scss";

export default function PokemonListSkeleton() {
  return (
    <div className={styles.cardList}>
      {Array.from({ length: 12 }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}
