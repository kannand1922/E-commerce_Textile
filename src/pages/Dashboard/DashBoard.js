import { useEffect, useState } from "react";
import "./bgcolor.scss";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import prodService from "../../api/prod";

function DashBoard() {
  const nav = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle Functions
  const handleLogout = () => {
    localStorage.removeItem("teamName");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    nav("/");
  };

  const fetchData = async () => {
    try {
      const response = await prodService.getProductsList();
      setTeamData(response.products); // Adjust according to your response structure
      console.log(response.products, "res");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      await prodService.addCartDetails(product);
      fetchData();
    } catch (error) {
      console.log(error);
      console.log("Failed to add product to cart");
    }
  };

  const removeFromCart = async (product) => {
    console.log(product, "");
    try {
      await prodService.removeCartItem(product);
      fetchData();
    } catch (error) {
      console.log(error);
      console.log("Failed to add product to cart");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = () => {
    nav("/cart");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="title-container">
          <span className="pom-title">APARNA</span>
          <span className="timer-title">  TEX</span>
        </div>
        <div className="flex1">
          <div className="logout-icon" onClick={handleLogout}>
            <ExitToAppIcon />
          </div>
          <div className="cart-nav" onClick={handleNavigate}>
            Cart
          </div>
        </div>
      </div>

      <div className="product-list">
        {loading && <p className="loading">Loading products...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div>
            <h2>Products List</h2>
            <ul>
              {teamData.map((product) => (
                <li key={product.id} className="product-item">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ₹{product.price}</p>
                  <div className="product-image">
                    {console.log(product.image, "iamge")}
                    <iframe
                      src={`${product.image}`} // Assuming `product.imageId` contains the Google Drive file ID
                      width="250"
                      height="250"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex">
                    <div
                      className="add-to-cart-button"
                      onClick={() => removeFromCart(product.id)}
                    >
                      -
                    </div>
                    <button className="add-to-cart-button">
                      Add to Cart
                      <span style={{ marginLeft: "10px" }}>
                        {product.cart_count}
                      </span>
                    </button>
                    <div
                      className="add-to-cart-button"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
