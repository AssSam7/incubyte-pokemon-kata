import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { STATS_COLORS as COLORS } from "@/constants";
import styles from "./BattleOverview.module.scss";

type Stat = {
  name: string;
  value: number;
};

type Props = {
  stats: Stat[];
};

const LABEL_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function BattleOverview({ stats }: Props) {
  const [ready, setReady] = useState(false);
  const maxOuter = 140;

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const data = stats.map((s, index) => {
    const base: any = {
      subject: LABEL_MAP[s.name],
      value: s.value,
      midLayer: s.value * 0.85,
      statKey: s.name,
    };

    stats.forEach((_, i) => {
      base[`axis_${i}`] = i === index ? maxOuter : 0;
    });

    return base;
  });

  return (
    <div className={styles.card}>
      {ready && (
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="82%">
            <PolarGrid stroke="rgba(0,0,0,0.12)" />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#5E6478",
                fontSize: 11,
                fontWeight: 500,
              }}
            />

            <PolarRadiusAxis domain={[0, 150]} tick={false} axisLine={false} />

            {stats.map((s, index) => (
              <Radar
                key={s.name}
                dataKey={`axis_${index}`}
                stroke={COLORS[s.name]}
                strokeWidth={2}
                fill="none"
                isAnimationActive={false}
              />
            ))}

            <Radar
              dataKey="midLayer"
              stroke="none"
              fill="#6C63FF"
              fillOpacity={0.15}
              isAnimationActive={false}
            />

            <defs>
              <linearGradient
                id="mainGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4CAF50" />
                <stop offset="20%" stopColor="#FF9800" />
                <stop offset="40%" stopColor="#4A90E2" />
                <stop offset="60%" stopColor="#9C27B0" />
                <stop offset="80%" stopColor="#EC407A" />
                <stop offset="100%" stopColor="#26C6DA" />
              </linearGradient>
            </defs>

            <Radar
              dataKey="value"
              stroke="#6C63FF"
              strokeWidth={3}
              fill="url(#mainGradient)"
              dot={({ payload, cx, cy }) => (
                <circle cx={cx} cy={cy} r={7} fill={COLORS[payload.statKey]} />
              )}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
