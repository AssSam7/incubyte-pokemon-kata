import { useState } from "react";
import styles from "./PokemonTabs.module.scss";

import AboutTab from "./AboutTab";
import StatsTab from "./StatsTab";
import EvolutionTab from "./EvolutionTab";
import { PokemonDetails } from "../../types/pokemonDetails";

type Props = {
  pokemon: PokemonDetails;
};

type Tab = "about" | "stats" | "evolution";

export default function PokemonTabs({ pokemon }: Props) {
  const [active, setActive] = useState<Tab>("about");

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabs}>
        {["about", "stats", "evolution"].map((tab) => (
          <button
            key={tab}
            className={
              active === tab ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => setActive(tab as Tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {active === "about" && <AboutTab pokemon={pokemon} />}
        {active === "stats" && <StatsTab pokemon={pokemon} />}
        {active === "evolution" && <EvolutionTab />}
      </div>
    </div>
  );
}
