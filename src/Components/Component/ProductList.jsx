import React from "react";
import ProductCard from "./ProductCard";
import style from "./ProductCard.module.css";

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <p className={style.NoProduct}>No products available.</p>;
  }

  return (
    <div className="bg-teal-100">
      <div className="grid grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-2">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
