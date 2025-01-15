import React from "react";
import CarImg from "/src/assets/Cart.png";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const CartIcon = ({ cartCount }) => {
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div onClick={handleCartClick}>
      <img src={CarImg} alt="cartimg" className="h-14 w-14 lg:ml-12" />
      <span className={styles.cartCount}>{JSON.stringify(cartCount)}</span>
    </div>
  );
};

export default CartIcon;
