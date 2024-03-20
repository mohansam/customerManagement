import React, { useState } from "react";
import { getProductsByCustomerMobileNum } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ProductCard from "./ProductCard";

const ProductsListComponent = ({ onSelectProduct, displayMessage }) => {
  const [mobileNum, setMobileNum] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isLoading) {
    return <LoaderModal />;
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
    <div className="container">
      <h2>{displayMessage}</h2>
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
        Fetch Products
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div className="card-item-list">
        {products.map((product) => (
          <div
            className="card-item"
            key={product.productId}
            onClick={() => onSelectProduct(product)}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsListComponent;
