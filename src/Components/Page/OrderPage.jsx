import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "/src/style/OrderPage.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [username, setUsername] = useState("");
  const [cartError, setCartError] = useState(false);

  const [isCartLaoding, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    if (username) {
      fetchCartCount(); //Fetch cart count if username is available
    }
  }, [username]); // Re-run cart count fetch if username change

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/orders", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.products || []);
      setUsername(data.username || "Guest");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      console.log(count);
      setCartCount(count);
      setCartError(false); // reset error state is successful
    } catch (error) {
      console.error("Error fetching cart count:", error);
    } finally {
      setIsCartLoading(false); //Remove loading state;
    }
  };
  console.log(orders);
  return (
    <div className="maindiv">
      <div className="customer-homepage">
        <Header
          cartCount={setIsCartLoading ? "." : cartError ? "Error" : cartCount}
          username={username}
        />

        <main className="main-content">
          <h1 className="form-title">Your Orders</h1>
          {loading && <p>Loading orders...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p>No orders found. Start shopping now!</p>
          )}
          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-card-header">
                    <h3>Order Id : {order.order_id}</h3>
                  </div>
                  <div className="order-card-body">
                    <img
                      src={order.image_url}
                      alt={order.name}
                      className="order-product-image"
                    />
                    <div className="order-details">
                      <h3 className="product-name">
                        ProductName : {order.name}
                      </h3>
                      <h3>Description : {order.description}</h3>
                      <h3>Quantity : {order.quantity}</h3>
                      <h3>
                        Price per Unit : ₹{order.price_per_unit.toFixed(2)}
                      </h3>
                      <h3>Total Price : ₹{order.total_price.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OrderPage;
