import React, { useState } from "react";
import Header from "../Component/Header";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  return <Header></Header>;
};

export default HomePage;
