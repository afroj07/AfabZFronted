import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "/src/style/CartPage.css";
const CartPage = () => {
  // Example initial cart data - replace with your actual data source
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Italy Pizza",
      price: 6.81 * 74, // Assuming 1 dollar = 74 rupees
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Extra cheese and toping",
    },
    {
      id: 2,
      name: "Combo Plate",
      price: 6.81 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Extra cheese and toping",
    },
    {
      id: 3,
      name: "Spanish Rice",
      price: 6.81 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Extra garlic",
    },
    {
      id: 4,
      name: "Chicken Wings",
      price: 8.99 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Spicy buffalo sauce",
    },
    {
      id: 5,
      name: "Caesar Salad",
      price: 5.99 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Fresh romaine lettuce",
    },
    {
      id: 6,
      name: "Garlic Bread",
      price: 3.99 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "With melted cheese",
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      price: 9.99 * 74,
      quantity: 1,
      image: "https://picsum.photos/200/300",
      description: "Creamy sauce with bacon",
    },
  ]);

  const shipping = 5.0 * 74; // Convert shipping to rupees

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: parseInt(newQuantity) || 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
      <Header />
      <div className="cart-pag lg:w-7/12">
        <a href="3" className="back-button">
          {" "}
          ← Shopping Continue
        </a>

        <div className="cart-header">
          <h2>Shopping cart</h2>
          <p>You have {cartItems.length} items in your cart</p>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="price">₹{item.price.toFixed(2)}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-section lg:w-7/12">
        <h2>Order Summary</h2>
        <div className="checkout-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(calculateSubtotal() + shipping).toFixed(2)}</span>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
