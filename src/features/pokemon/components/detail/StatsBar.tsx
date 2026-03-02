import styles from "./StatsBar.module.scss";

type Props = {
  label: string;
  value: number;
};

const STAT_COLORS: Record<
  string,
  { gradient: string; light: string; pill: string }
> = {
  hp: {
    gradient: "linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)",
    light: "rgba(76, 175, 80, 0.12)",
    pill: "#4CAF50",
  },
  attack: {
    gradient: "linear-gradient(90deg, #FF9800 0%, #FFB74D 100%)",
    light: "rgba(255, 152, 0, 0.12)",
    pill: "#FF9800",
  },
  defense: {
    gradient: "linear-gradient(90deg, #4A90E2 0%, #6FA8FF 100%)",
    light: "rgba(74, 144, 226, 0.12)",
    pill: "#4A90E2",
  },
  "special-attack": {
    gradient: "linear-gradient(90deg, #9C27B0 0%, #BA68C8 100%)",
    light: "rgba(156, 39, 176, 0.12)",
    pill: "#9C27B0",
  },
  "special-defense": {
    gradient: "linear-gradient(90deg, #EC407A 0%, #F48FB1 100%)",
    light: "rgba(236, 64, 122, 0.12)",
    pill: "#EC407A",
  },
  speed: {
    gradient: "linear-gradient(90deg, #26C6DA 0%, #4DD0E1 100%)",
    light: "rgba(38, 198, 218, 0.12)",
    pill: "#26C6DA",
  },
};

const LABEL_FORMAT: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function StatsBar({ label, value }: Props) {
  const normalized = label.toLowerCase();
  const colors = STAT_COLORS[normalized];

  if (!colors) return null; // safety guard

  const percentage = Math.min((value / 150) * 100, 100);

  return (
    <div className={styles.row} style={{ background: colors.light }}>
      <span className={styles.label} style={{ background: colors.pill }}>
        {LABEL_FORMAT[normalized]}
      </span>

      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{
            width: `${percentage}%`,
            background: colors.gradient,
          }}
        />
      </div>

      <span className={styles.value}>{value}</span>
    </div>
  );
}
