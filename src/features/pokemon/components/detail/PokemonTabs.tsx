import { useState } from "react";
import styles from "./PokemonTabs.module.scss";

import AboutTab from "./AboutTab";
import StatsTab from "./StatsTab";
import EvolutionTab from "./EvolutionTab";

type Props = {
  pokemon: any;
};

export default function PokemonTabs({ pokemon }: Props) {
  const [active, setActive] = useState<"about" | "stats" | "evolution">(
    "about"
  );

  return (
    <div>
      <div className={styles.tabs}>
        {["about", "stats", "evolution"].map((tab) => (
          <button
            key={tab}
            className={
              active === tab ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => setActive(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {active === "about" && <AboutTab pokemon={pokemon} />}
        {active === "stats" && <StatsTab pokemon={pokemon} />}
        {active === "evolution" && <EvolutionTab pokemon={pokemon} />}
      </div>
    </div>
  );
}
