import styles from "./AboutTab.module.scss";

type Props = {
  pokemon: any;
};

export default function AboutTab({ pokemon }: Props) {
  const height = (pokemon.height / 10).toFixed(1);
  const weight = (pokemon.weight / 10).toFixed(1);

  const abilities = pokemon.abilities
    ?.map(
      (a: any) =>
        a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
    )
    .join(", ");

  return (
    <div className={styles.container}>
      {/* LEFT COLUMN */}
      <div>
        <p className={styles.description}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is a{" "}
          {pokemon.types?.map((t: any) => t.type.name).join("/")} type Pokémon
          known for its unique abilities and characteristics.
        </p>

        <h3 className={styles.sectionTitle}>Breeding</h3>

        <div className={styles.infoCard}>
          <div className={styles.row}>
            <span>Base Experience</span>
            <span className={styles.value}>{pokemon.base_experience}</span>
          </div>

          <div className={styles.row}>
            <span>Abilities</span>
            <span className={styles.value}>{abilities}</span>
          </div>

          <div className={styles.row}>
            <span>Height</span>
            <span className={styles.value}>{height} m</span>
          </div>

          <div className={styles.row}>
            <span>Weight</span>
            <span className={styles.value}>{weight} kg</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.infoCard}>
        <div className={styles.row}>
          <span>Order</span>
          <span className={styles.value}>{pokemon.order}</span>
        </div>

        <div className={styles.row}>
          <span>Species</span>
          <span className={styles.value}>{pokemon.species?.name}</span>
        </div>

        <div className={styles.row}>
          <span>Forms</span>
          <span className={styles.value}>{pokemon.forms?.length}</span>
        </div>
      </div>
    </div>
  );
}
