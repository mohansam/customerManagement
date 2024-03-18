import React, { useState } from "react";
import { getCustomerByMobileNum } from "../services/CustomerService";
import { getProductsByCustomerId } from "../services/ProductService";
import ProductCard from "../component/Product/ProductCard";
import ErrorMessageModel from "../component/ErrorMessageModel/ErrorMessageModel";
import LoaderModal from "../component/Loader/LoaderModal";

const CheckCustomerDetails = () => {
  const [mobileNum, setMobileNum] = useState(""); // State to hold the input mobile number
  const [customerDetails, setCustomerDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomerAndProducts = async () => {
    setIsLoading(true);
    try {
      const customer = await getCustomerByMobileNum(mobileNum);
      setCustomerDetails(customer);
      const productsList = await getProductsByCustomerId(customer.id);
      setProducts(productsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the mobile number form submit
  const handleMobileNumSubmit = async (e) => {
    e.preventDefault();
    await fetchCustomerAndProducts();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleMobileNumSubmit}>
        <label>
          Enter Customer's Mobile Number:
          <input
            type="text"
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Customer</button>
      </form>

      {isLoading && <LoaderModal />}
      {error && (
        <ErrorMessageModel message={error} onClose={() => setError("")} />
      )}

      {customerDetails && (
        <div>
          <h2>Customer Details</h2>
          <p>Name: {customerDetails.name}</p>
          {/* Display other customer details */}
        </div>
      )}

      <div>
        <h2>Products</h2>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // Assuming ProductCard supports onClick prop
            onClick={() => console.log("Product clicked", product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckCustomerDetails;
