import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../services/CustomerService";
import { getProductById } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import ProductCard from "../Product/ProductCard";
import CustomerCard from "../Customer/CustomerCard";
import "./DetailsModal.css";

const DetailsModal = ({ serviceObject, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const userDetails = await getCustomerById(serviceObject.customerId);
        const productDetails = await getProductById(serviceObject.productId);
        setUserDetails(userDetails);
        setProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to fetch service details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceObject]);

  if (isLoading) {
    return <LoaderModal />;
  }

  if (error) {
    return <ErrorMessageModel message={error} onClose={onClose} />;
  }

  return (
    <div className="details-modal-backdrop">
      <div className="details-modal-content">
        <div className="card-item">
          {userDetails && (
            <>
              <CustomerCard customer={userDetails} />
            </>
          )}
          {productDetails && (
            <>
              <ProductCard product={productDetails} />
            </>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
