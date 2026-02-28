import styles from "./StatsBar.module.scss";

type Props = {
  label: string;
  value: number;
};

export default function StatsBar({ label, value }: Props) {
  const percentage = Math.min((value / 150) * 100, 100);

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>

      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${percentage}%` }} />
      </div>

      <span className={styles.value}>{value}</span>
    </div>
  );
}
