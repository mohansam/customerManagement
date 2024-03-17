import React, { useEffect, useState } from "react";
import {
  getUpcomingServices,
  markServiceAsCompleted,
} from "../../../services/ServiceService";
import LoaderModal from "../../Loader/LoaderModal";
import ErrorMessageModel from "../../ErrorMessageModel/ErrorMessageModel";
import DetailsModal from "../../DetailsModal/DetailsModal";
import "./UpcomingServicesComponent.css";

const UpcomingServicesComponent = () => {
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
        const services = await getUpcomingServices();
        setPendingServices(services);
      } catch (error) {
        console.error("Failed to load upcoming services:", error);
        setModalMessage(error.message);
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingServices();
  }, []);

  const handleMarkAsCompleted = async (serviceId) => {
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
      <h2>Upcoming Services</h2>
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
              <button onClick={() => handleMarkAsCompleted(service.serviceId)}>
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

export default UpcomingServicesComponent;
