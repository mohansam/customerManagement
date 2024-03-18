import React, { useState } from "react";
import { getProductsByCustomerMobileNum } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import "./ProductListStyle.css"; // Adjust this path as necessary

const ProductsListComponent = ({ onSelectProduct }) => {
  const [mobileNum, setMobileNum] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isLoading) {
    return <LoaderModal />; // Show loader when loading
  }

  const handleMobileNumChange = (e) => {
    setMobileNum(e.target.value);
    setProducts([]);
    setError("");
  };

  const fetchProducts = async () => {
    if (mobileNum.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const fetchedProducts = await getProductsByCustomerMobileNum(mobileNum);
      if (fetchedProducts.length === 0) {
        setError("No products found for the given mobile number.");
      } else {
        setProducts(fetchedProducts);
      }
    } catch (error) {
      setError(error.message || "Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-list-container">
      <h2>Create New Service</h2>
      <input
        type="text"
        placeholder="Enter customer's mobile number"
        value={mobileNum}
        onChange={handleMobileNumChange}
        className="form-input"
      />
      <button
        onClick={fetchProducts}
        disabled={isLoading}
        className="form-button"
      >
        {isLoading ? "Loading..." : "Fetch Products"}
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div>
        {products.map((product) => (
          <div
            key={product.productId}
            onClick={() => onSelectProduct(product)}
            className="product-item"
          >
            <h3>{product.productName}</h3>
            <p>Model: {product.model}</p>
            <p>Membrane: {product.membrane}</p>
            <p>Pump: {product.pump}</p>
            <p>Power Supply: {product.powerSupply}</p>
            <p>
              Date of Installation:{" "}
              {new Date(product.dateOfInstallation).toLocaleDateString()}
            </p>
            <p>Warranty: {product.warranty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsListComponent;
