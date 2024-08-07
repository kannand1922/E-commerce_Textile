import "./cart.scss";

import React, { useEffect, useState } from "react";
import prodService from "../../api/prod";
import { useNavigate } from "react-router";
function Cart() {
  const nav = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await prodService.getCartList();
      setCartItems(response.products); // Adjust according to your response structure
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch cart items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = () => {
    nav("/home");
  };

  console.log(cartItems, "kkk");
  return (
    <div className="cart">
      {loading && <p className="loading">Loading cart items...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          <div className="flex">
            <h2>Cart</h2>
            <h2 className="back" onClick={handleNavigate}>
              Home
            </h2>
          </div>

          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <iframe
                  src={`${item.image}`} // Assuming `product.imageId` contains the Google Drive file ID
                  width="250"
                  height="250"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Total Price: ₹{item.total_price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cart;
