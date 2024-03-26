import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../services/CustomerService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import CustomerCard from "../Customer/CustomerCard";
import "./DetailsModal.css";

const CustomerDetailsModal = ({ selectedProduct, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const userDetails = await getCustomerById(selectedProduct.customerId);
        setUserDetails(userDetails);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to fetch service details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedProduct]);

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
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
