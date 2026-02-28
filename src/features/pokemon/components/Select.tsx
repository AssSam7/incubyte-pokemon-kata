import { Check, ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { SelectOption } from "../types/filters";

type Props = {
  icon?: ReactNode;
  label: string;
  options: SelectOption[];
  selectedValue?: string;
  variant?: "default" | "type" | "ability";
  onToggle: () => void;
  onSelectOption: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
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
  onClose,
}: Props) {
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const selectDropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectDropDownRef.current &&
        !selectDropDownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.selectButtonContainer}>
      <div
        className={`${styles.selectButton} 
          ${isOpen ? styles.active : ""} 
          ${variant ? styles[variant] : ""}`}
        onClick={onToggle}
      >
        <div>
          {icon}
          <span>{selectedOption?.label ?? label}</span>
        </div>
        <ChevronDown size={18} />
      </div>

      {isOpen && (
        <div ref={selectDropDownRef} className={styles.dropDownPanel}>
          {options.map((option) => {
            const isSelected = option.value === selectedValue;

            return (
              <div
                key={option.value}
                className={`${styles.option} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => onSelectOption(option.value)}
                aria-selected={isSelected}
                role="option"
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
