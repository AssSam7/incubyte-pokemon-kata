import { useState } from "react";
import styles from "./ActionToolbar.module.scss";
import Select from "./Select";
import { CircleDot, CircleDotDashed, CircleSlash } from "lucide-react";

const items = [
  { id: 1, label: "Ascending" },
  { id: 2, label: "Type", icon: <CircleDot /> },
  { id: 3, label: "Ability", icon: <CircleDotDashed /> },
  { id: 4, label: "Height", icon: <CircleSlash /> },
];
const options = ["Option 1", "Option 2", "Option 3"];
const initialFilters = {
  sortBy: "",
  type: "",
  ability: "",
  height: "",
};

export default function ActionToolbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [filters, setFilters] = useState<typeof initialFilters>(initialFilters);

  return (
    <div className={styles.actionToolbar}>
      {items.map((item) => (
        <Select
          key={item.id}
          icon={item.icon}
          label={item.label}
          options={options}
          isSelected={activeItem === item.label}
          onSelect={() => setActiveItem(item.label)}
          onSelectOption={(label) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              [item.label]: label,
            }))
          }
        />
      ))}
    </div>
  );
}
