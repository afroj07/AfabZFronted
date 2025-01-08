import React from "react";
import styles from "./CategoryNavigation.module.css";

const CategoryNavigation = ({ onCategoryClick }) => {
  const categories = [
    "Shirts",
    "Pants",
    "T-Shirts",
    "Kurtas",
    "Blazer",
    "Jackets",
  ];

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.itemList}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={styles.item}
            onClick={() => onCategoryClick(category)} //Triger the click handle
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
