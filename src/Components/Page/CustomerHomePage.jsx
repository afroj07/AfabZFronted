import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import ProductList from "../Component/ProductList";
import CategoryNavigation from "../Component/CategoryNavigation";
import Footer from "../Component/Footer";
import ProductCard from "../Component/ProductCard";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    if (username) {
      fetchCartCount();
    }
  }, [username]); // Re run cart count if username changes

  const fetchProducts = async (category = "") => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/products${
          category ? `?category=${category}` : "?category=Shirts"
        }`,
        { credentials: "include" } // include authToken as a cookie
      );
      const data = await response.json();
      if (data) {
        setUsername(data.user?.name || "Guest"); // Extract username
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setCartCount(true); //set loading state

    try {
      const response = await fetch(
        `http://localhost:9090/api/cart/items/count?username=${username}`,
        {
          credentials: "include", // include authtoken as cookie
        }
      );

      const count = await response.json();
      setCartCount(count);
      setCartError(false); // reset error state is successful
    } catch (error) {
      console.error("Error fetching cart count:", error);
    } finally {
      setIsCartLoading(false); //Remove loading state;
    }
  };

  const handleCateoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error("Username is required to add items to the cart");
      return;
    }
    try {
      const response = await fetch("http://localhost:9090/api/cart/add", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ username, productId }), // Include username and productId in request
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchCartCount(); //update Cart Count
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? "..." : cartError ? "Error" : cartCount}
        username={username}
      />
      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCateoryClick} />
      </nav>
      {/* <main className="main-content">
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main> */}
      <ProductCard />
      <Footer />
    </div>
  );
};

export default HomePage;
