import { useNavigate } from "react-router-dom";
import styles from "./PokemonCard.module.scss";
import { PokemonCardData } from "../types";

export default function PokemonCard({
  id,
  img,
  nId,
  name,
  types,
}: PokemonCardData) {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/pokemon/${id}`)}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`Pokemon ${name}`} />
      </div>

      <span className={styles.pokemonId}>{nId}</span>
      <h3 className={styles.name}>{name}</h3>

      {types.length > 0 && (
        <div className={styles.types}>
          {types.map((type) => (
            <span
              key={type}
              className={styles.type}
              data-type={type.toLowerCase()}
            >
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
