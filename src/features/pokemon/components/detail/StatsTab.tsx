import StatsBar from "./StatsBar";
import styles from "./StatsTab.module.scss";

export default function StatsTab({ pokemon }: any) {
  return (
    <div className={styles.container}>
      {pokemon.stats.map((stat: any) => (
        <StatsBar
          key={stat.stat.name}
          label={stat.stat.name}
          value={stat.base_stat}
        />
      ))}
    </div>
  );
}
