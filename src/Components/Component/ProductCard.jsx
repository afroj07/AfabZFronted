import React from "react";
import PremimumImg from "/src/assets/premium.jpg";
import styles from "./ProductCard.module.css";
const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={PremimumImg}
        alt="img"
        className={styles.productImage}
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // Fallback image
        }}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>name</h3>
        <p className={styles.productPrice}>Rs.200</p>
        <button
          className={styles.addBtnCard}
          onClick={() => onAddToCart(product.product_id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
