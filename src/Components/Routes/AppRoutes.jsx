import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import RegistrationPage from "../Page/RegistrationPage";
import CustomerHomePage from "../Page/CustomerHomePage";
import CartPage from "../Page/CartPage";
import OrderPage from "../Page/OrderPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrderPage />} />
    </Routes>
  );
};

export default AppRoutes;
