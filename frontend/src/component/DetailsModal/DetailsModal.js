import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../services/CustomerService";
import { getProductById } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
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
        <h2>Service Details</h2>
        {userDetails && (
          <>
            <p>User Name: {userDetails.customerName}</p>
            <p>Address: {userDetails.customerAddress}</p>
            <p>Mobile: {userDetails.customerMobileNum}</p>
          </>
        )}
        {productDetails && (
          <>
            <p>Product Name: {productDetails.productName}</p>
            <p>
              Date of Installation:{" "}
              {new Date(productDetails.dateOfInstallation).toLocaleDateString()}
            </p>
            <p>Warranty: {productDetails.warranty}</p>
            <p>Model: {productDetails.model}</p>
            <p>Pump: {productDetails.pump}</p>
            <p>Membrane: {productDetails.membrane}</p>
            <p>Power Supply: {productDetails.powerSupply}</p>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailsModal;
