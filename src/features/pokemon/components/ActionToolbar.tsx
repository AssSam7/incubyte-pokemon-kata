import { useState } from "react";
import styles from "./ActionToolbar.module.scss";
import Select from "./Select";
import { CircleDot, CircleDotDashed, CircleSlash } from "lucide-react";

export type FilterKey = "sortBy" | "type" | "ability" | "height";
export type SelectOption = {
  label: string;
  value: string;
};
type ToolbarItem = {
  id: number;
  label: string;
  key: FilterKey;
  icon?: React.ReactNode;
};
type Filters = {
  sortBy: string;
  type: string;
  ability: string;
  height: string;
};

const initialFilters: Filters = {
  sortBy: "",
  type: "",
  ability: "",
  height: "",
};
const items: ToolbarItem[] = [
  { id: 1, label: "Ascending", key: "sortBy" },
  { id: 2, label: "Type", key: "type", icon: <CircleDot /> },
  { id: 3, label: "Ability", key: "ability", icon: <CircleDotDashed /> },
  { id: 4, label: "Height", key: "height", icon: <CircleSlash /> },
];
const filterOptions: Record<FilterKey, SelectOption[]> = {
  sortBy: [
    { label: "ID (Ascending)", value: "id_asc" },
    { label: "ID (Descending)", value: "id_desc" },
    { label: "Name (A–Z)", value: "name_asc" },
    { label: "Name (Z–A)", value: "name_desc" },
  ],

  type: [
    { label: "Normal", value: "normal" },
    { label: "Fire", value: "fire" },
    { label: "Water", value: "water" },
    { label: "Electric", value: "electric" },
    { label: "Grass", value: "grass" },
    { label: "Ice", value: "ice" },
    { label: "Fighting", value: "fighting" },
    { label: "Poison", value: "poison" },
    { label: "Ground", value: "ground" },
    { label: "Flying", value: "flying" },
    { label: "Psychic", value: "psychic" },
    { label: "Bug", value: "bug" },
    { label: "Rock", value: "rock" },
    { label: "Ghost", value: "ghost" },
    { label: "Dragon", value: "dragon" },
    { label: "Dark", value: "dark" },
    { label: "Steel", value: "steel" },
    { label: "Fairy", value: "fairy" },
  ],

  ability: [
    { label: "Overgrow", value: "overgrow" },
    { label: "Blaze", value: "blaze" },
    { label: "Torrent", value: "torrent" },
    { label: "Shield Dust", value: "shield-dust" },
    { label: "Intimidate", value: "intimidate" },
    { label: "Static", value: "static" },
    { label: "Levitate", value: "levitate" },
    { label: "Chlorophyll", value: "chlorophyll" },
    { label: "Swift Swim", value: "swift-swim" },
    { label: "Pressure", value: "pressure" },
  ],

  height: [
    { label: "Shortest First", value: "height_asc" },
    { label: "Tallest First", value: "height_desc" },
  ],
};

export default function ActionToolbar() {
  const [openSelect, setOpenSelect] = useState<FilterKey | null>(null);
  const [filters, setFilters] = useState<typeof initialFilters>(initialFilters);

  return (
    <div className={styles.actionToolbar}>
      {items.map((item) => (
        <Select
          key={item.id}
          icon={item.icon}
          label={item.label}
          options={filterOptions[item.key]}
          variant={item.label === "Ascending" ? "sort" : "default"}
          selectedValue={filters[item.key]}
          isOpen={openSelect === item.key}
          onToggle={() =>
            setOpenSelect(openSelect === item.key ? null : item.key)
          }
          onSelectOption={(value) => {
            setFilters((prev) => ({ ...prev, [item.key]: value }));
            setOpenSelect(null);
          }}
        />
      ))}
    </div>
  );
}
