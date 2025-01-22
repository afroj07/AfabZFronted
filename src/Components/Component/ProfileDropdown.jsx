import React, { useState } from "react";
import Avatar from "/src/assets/useravatar.png";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout functionality here
  };

  const handleOreder = () => {
    navigate("/orders");
  };

  return (
    <div className="profile">
      <div className="">
        <button className="profilBtn" onClick={toggleDropdown}>
          <img
            src={Avatar}
            alt="User-Avatar"
            className="avatarImg h-12 w-12"
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
          <hr className="bg-slate-400 max-h-0.5 w-full" />
          <a href="#">Profile</a>
          <button className="logout" onClick={handleOreder}>
            Orders
          </button>
          <button className="logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
