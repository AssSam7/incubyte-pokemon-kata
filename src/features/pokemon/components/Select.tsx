import { Check, ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";
import { ReactNode } from "react";
import { SelectOption } from "./Actiontoolbar";

type Props = {
  icon?: ReactNode;
  label: string;
  options: SelectOption[];
  selectedValue?: string;
  variant?: "default" | "sort";
  onToggle: () => void;
  onSelectOption: (option: string) => void;
  isOpen: boolean;
};

export default function Select({
  icon,
  label,
  options,
  selectedValue,
  variant = "default",
  onToggle,
  onSelectOption,
  isOpen,
}: Props) {
  return (
    <div className={styles.selectButtonContainer}>
      <div
        className={`${styles.selectButton} 
          ${isOpen ? styles.active : ""} 
          ${variant === "sort" ? styles.sortVariant : ""}`}
        onClick={onToggle}
      >
        <div>
          {icon}
          <span>{selectedValue || label}</span>
        </div>
        <ChevronDown size={18} />
      </div>

      {isOpen && (
        <div className={styles.dropDownPanel}>
          {options.map((option) => {
            const isSelected = option.label === selectedValue;

            return (
              <div
                key={option.value}
                className={`${styles.option} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => onSelectOption(option.label)}
              >
                <Check size={16} strokeWidth={3.5} />
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
