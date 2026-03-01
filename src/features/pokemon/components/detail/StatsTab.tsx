import { PokemonDetails } from "../../types/pokemonDetails";
import StatsBar from "./StatsBar";
import styles from "./StatsTab.module.scss";

export default function StatsTab({ pokemon }: { pokemon: PokemonDetails }) {
  const total = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.statsList}>
        {pokemon.stats.map((stat) => (
          <StatsBar
            key={stat.stat.name}
            label={stat.stat.name}
            value={stat.base_stat}
          />
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.totalCard}>
        <div className={styles.totalLabel}>Total</div>
        <div className={styles.totalValue}>{total}</div>
        <div className={styles.totalBar} />
      </div>
    </div>
  );
}
