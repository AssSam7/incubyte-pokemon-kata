import { Check, ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  label: string;
  options: string[];
  onSelect: (name: string) => void;
  onSelectOption: (option: string) => void;
  isSelected: boolean;
};

export default function Select({
  icon,
  label,
  options,
  onSelect,
  onSelectOption,
  isSelected,
}: Props) {
  return (
    <div className={styles.selectButtonContainer}>
      <div className={styles.selectButton} onClick={() => onSelect(label)}>
        <div>
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown />
      </div>

      {isSelected && (
        <div className={styles.dropDownPanel}>
          {options.map((option) => (
            <div key={option} onClick={() => onSelectOption(option)}>
              <Check />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
