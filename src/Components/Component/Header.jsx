import React from "react";
import Afabzlogo from "/src/assets/afabzlogo.jpg";
import ProfileDropdown from "./ProfileDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
const Header = ({ cartCount, username }) => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <div>
          <img src={Afabzlogo} alt="logo" className={styles.logoImage} />
          <h1 className={styles.header}>AfabZ</h1>
        </div>

        <div className="bg-slate-300 h-8 w-fit rounded-md border-none">
          <input
            type="text"
            placeholder="What are you looking for"
            className=" bg-slate-300 border-none outline-none  mx-3"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="  text-slate-700 lg:mx-6"
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faCartShopping}
            size="2x"
            className="text-slate-800 lg:ml-12 mt-1"
          />
          <span className={styles.cartCount}>{cartCount}</span>
        </div>
        <ProfileDropdown username={username} />
      </div>
    </div>
  );
};

export default Header;
