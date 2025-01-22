import React from "react";
import Afabzlogo from "/src/assets/afabzlogo1.png";
import SearchImg from "/src/assets/searchImg.png";
import ProfileDropdown from "./ProfileDropdown";
import styles from "./Header.module.css";

import CartIcon from "./CartIcon";
import { useNavigate } from "react-router-dom";
const Header = ({ CartCount, username }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/customerhome");
  };

  return (
    <div className={styles.headerContainer}>
      <div>
        <div>
          <button onClick={handleNavigate}>
            <img src={Afabzlogo} alt="logo" className={styles.logoImage} />
          </button>
          <h1 className={styles.header}>AfabZ</h1>
        </div>

        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="What are you looking for"
            className=" bg-slate-200 border-none outline-none  lg:mx-3"
          />
          <img src={SearchImg} alt="searchImg" className="lg:mx-3 h-8 w-8" />
        </div>
        <CartIcon cartCount={CartCount} />
        <ProfileDropdown username={username} />
      </div>
    </div>
  );
};

export default Header;
