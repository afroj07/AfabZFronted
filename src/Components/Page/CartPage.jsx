import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "/src/style/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0); // State to store the subtotal

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/cart/items", {
          credentials: "include", // Include the authToken cookie
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(
          data?.cart?.products.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price).toFixed(2),
            price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
          })) || []
        );
        setOverallPrice(
          parseFloat(data?.cart?.overall_total_price || 0).toFixed(2)
        );
        setUsername(data?.username || ""); // Save the username from the response
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Update subtotal whenever cartItems change
    const total = cartItems
      .reduce((total, item) => total + parseFloat(item.total_price), 0)
      .toFixed(2);
    setSubtotal(total);
  }, [cartItems]);

  const handleBackBtn = () => {
    navigate("/customerhome");
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch("http://localhost:9090/api/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username, // Include the username
          productId,
        }),
      });
      if (response.status === 204) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId)
        );
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveItem(productId);
        return;
      }
      const response = await fetch("http://localhost:9090/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username, // Include the username
          productId,
          quantity: newQuantity,
        }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: (item.price_per_unit * newQuantity).toFixed(2), // Update total price
                }
              : item
          )
        );
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // RazorPay integration for payment

  const handleCheckout = async () => {
    try {
      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      // Create Razorpay order via backend

      const response = await fetch("http://localhost:9090/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      const razorpayOrderId = await response.text();

      // open Razorpay checkout interface

      const options = {
        key: "rzp_test_mXd5LVamcdp88C", // razorpay key ID
        amount: subtotal * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "AfabZ",
        description: "Test-transction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Payment succes s verification on backend

            const verifyResponse = await fetch(
              "http://localhost:9090/api/payment/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id, //Ensure key match backend
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            const result = await verifyResponse.text();

            if (verifyResponse.ok) {
              alert("Payment verified successfully!");
              navigate("/customerhome"); //redirect to Customer Home Page
            } else {
              alert("Payement verification failed: " + result);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },

        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed, Please try again.");
      console.error("Error during checkout:", error);
    }
  };

  const totalProducts = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };
  const shipping = (5.0 * 74).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw" }}>
      <Header cartCount={totalProducts()} username={username} />
      <div className="cart-container">
        <div className="cart-page">
          <button onClick={handleBackBtn} className="back-button">
            ← Shopping Continue
          </button>

          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <p>You have {cartItems.length} items in your cart</p>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <img
                  src={
                    item.image_url ||
                    "https://via.placeholder.com/80?text=No+Image"
                  }
                  alt={item.name}
                />
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="price">₹{item.total_price}</span>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-section">
          <h2>Order Summary</h2>
          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="summary-row">
              <span>Total Products</span>
              <span>{totalProducts()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>
                ₹{(parseFloat(subtotal) + parseFloat(shipping)).toFixed(2)}
              </span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
