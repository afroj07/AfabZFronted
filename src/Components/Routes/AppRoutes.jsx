import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import RegistrationPage from "../Page/RegistrationPage";
import CustomerHomePage from "../Page/CustomerHomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default AppRoutes;
