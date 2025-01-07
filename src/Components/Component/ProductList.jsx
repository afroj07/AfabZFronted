import React from "react";
import ProductCard from "./ProductCard";
import style from "./Product.module.css";
export function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p className={style.NoProduct}>No products available.</p>;
  }

  return (
    <div className={style.ProductList}>
      <div className={style.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
