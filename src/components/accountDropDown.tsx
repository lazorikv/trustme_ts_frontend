import React from "react";
import styles from "../styles/accountDropDown.module.css";

interface DropdownItem {
  text: string;
  action?: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
}
const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div className={styles.DropDown}>
      {items.map((item, index) => (
        <div key={index} className={styles.item} onClick={item.action}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
