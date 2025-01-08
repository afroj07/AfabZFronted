import React, { useState } from "react";
import Avatar from "/src/assets/useravatar.png";

const ProfileDropdown = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout functionality here
  };

  return (
    <div className="profile">
      <div className="">
        <button className="profilBtn" onClick={toggleDropdown}>
          <img
            src={Avatar}
            alt="User-Avatar"
            className="avatarImg"
            onError={(e) => {
              e.target.src = "fallback-logo.png";
            }}
          />
        </button>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <button
            onClick={toggleDropdown}
            className=" ml-14 text-2xl text-slate-500 "
          >
            x
          </button>
          <span className="username text-slate-500 font-bold">
            {username || "Guest"}
          </span>
          <hr />
          <a href="#">Profile</a>
          <a href="#">Orders</a>
          <button className="logout" onClick={handleLogout}></button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
