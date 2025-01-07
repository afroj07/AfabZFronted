import React from "react";
import style from "./Product.module.css";
const ProductCard = ({ product }) => {
  return (
    <div className={style.productCard}>
      <img
        src={product.images[0]}
        alt={product.name}
        className={style.productImage}
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // Fallback image
        }}
      />
      <div className={style.productInfo}>
        <h3 className={style.productName}>${product.name}</h3>
        <p className={style.productPrice}>${product.price}</p>
        <button
          className={style.addBtnCard}
          onClick={() => onAddToCart(product.product_id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
