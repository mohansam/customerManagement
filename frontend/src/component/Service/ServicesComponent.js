import React, { useEffect, useState } from "react";
import { markServiceAsCompleted } from "../../services/ServiceService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import DetailsModal from "../DetailsModal/DetailsModal";
import ServiceCard from "./ServiceCard";

const ServicesComponent = ({ serviceType, serviceFetcher }) => {
  const [services, setServices] = useState([]);
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
        const data = await serviceFetcher();
        setServices(data);
      } catch (error) {
        console.error("Failed to load pending services:", error);
        setModalMessage(error.message);
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingServices();
  }, [serviceFetcher]);

  const handleMarkAsCompleted = async (event, serviceId) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    setIsLoading(true);
    try {
      await markServiceAsCompleted(serviceId);
      setServices((prev) =>
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
    <div className="container">
      <h2>{serviceType} Services</h2>
      {services.length > 0 ? (
        <div className="card-item-list">
          {services.map((service) => (
            <div
              className="card-item"
              key={service.serviceId}
              onClick={() => handleServiceSelect(service)}
            >
              <ServiceCard service={service} />
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
        !isModalOpen && <p>No {serviceType} services available.</p>
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

export default ServicesComponent;
