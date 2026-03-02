import { PokemonDetails } from "../../types/pokemonDetails";
import BattleOverview from "./BattleOverview";

import styles from "./StatsTab.module.scss";

export default function StatsTab({ pokemon }: { pokemon: PokemonDetails }) {
  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.battleOverviewContainer}>
          <h3>Battle Overview</h3>
          <BattleOverview
            stats={pokemon.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            }))}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
    </div>
  );
}
