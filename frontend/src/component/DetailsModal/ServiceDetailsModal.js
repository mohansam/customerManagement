import React, { useEffect, useState } from "react";
import { getServicesByProductId } from "../../services/ServiceService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import ServiceCard from "../Service/ServiceCard";
import "./DetailsModal.css";

const ServiceDetailsModal = ({ selectedProduct, onClose }) => {
  const [serviceDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const userDetails = await getServicesByProductId(
          selectedProduct.productId
        );
        setUserDetails(userDetails);
      } catch (error) {
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
        {serviceDetails.length > 0 ? (
          <div className="card-item-list">
            {serviceDetails.map((service) => (
              <div className="card-item" key={service.serviceId}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card-item">
            <p>No services available for this product.</p>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
