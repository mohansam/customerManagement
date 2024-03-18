import React, { useEffect, useState } from "react";
import {
  getPendingServices,
  markServiceAsCompleted,
} from "../../../services/ServiceService";
import LoaderModal from "../../Loader/LoaderModal";
import ErrorMessageModel from "../../ErrorMessageModel/ErrorMessageModel";
import DetailsModal from "../../DetailsModal/DetailsModal";
import "./PendingServicesComponent.css";

const PendingServicesComponent = () => {
  const [pendingServices, setPendingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPendingServices = async () => {
      try {
        const services = await getPendingServices();
        setPendingServices(services);
      } catch (error) {
        console.error("Failed to load pending services:", error);
        setModalMessage(error.message);
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingServices();
  }, []);

  const handleMarkAsCompleted = async (event, serviceId) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    setIsLoading(true);
    try {
      await markServiceAsCompleted(serviceId);
      setPendingServices((prev) =>
        prev.filter((service) => service.serviceId !== serviceId)
      );
    } catch (error) {
      console.error("Error marking service as completed:", error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoaderModal />;
  }

  return (
    <div className="pending-services-container">
      <h2>Pending Services</h2>
      {pendingServices.length > 0 ? (
        <div className="services-grid">
          {pendingServices.map((service) => (
            <div
              className="service-card"
              key={service.serviceId}
              onClick={() => handleServiceSelect(service)}
            >
              <h3>{service.productName}</h3>
              <p>ServiceDate: {service.serviceDate}</p>
              <p>ServiceType: {service.serviceType}</p>
              <p>IsServiceCompleted: {service.isServiceCompleted.toString()}</p>
              <p>PartsReplaced: {service.partsReplaced}</p>
              <p>AmountCharged: {service.amountCharged}</p>
              <p>CustomerRemarks: {service.customerRemarks}</p>
              <button
                onClick={(event) =>
                  handleMarkAsCompleted(event, service.serviceId)
                }
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isModalOpen && <p>No pending services available.</p>
      )}
      <ErrorMessageModel
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      {selectedService && (
        <DetailsModal
          serviceObject={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default PendingServicesComponent;
