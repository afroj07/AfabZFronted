import React from "react";
import PremimumImg from "/src/assets/premium.jpg";
import styles from "./ProductCard.module.css";
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={product.images[0]}
        alt={product.name}
        className={styles.productImage}
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // Fallback image
        }}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>{product.description}</p>
        <p className={styles.productPrice}>Rs{product.price}</p>
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
