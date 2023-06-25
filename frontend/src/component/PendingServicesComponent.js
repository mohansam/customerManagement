import React, { useEffect, useState } from "react";
import "./PendingServicesComponent.css";

const PendingServicesComponent = () => {
  const [pendingServices, setPendingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/service/getPendingServices")
      .then((response) => response.json())
      .then((data) => {
        setPendingServices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        // Handle error
      });
  }, []);

  const markServiceAsCompleted = (serviceId) => {
    setIsLoading(true);
    // Make API call to mark service as completed
    fetch(`/api/v1/service/markServiceAsCompletedByServiceId/${serviceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Service marked as completed:", data);
        // Remove the completed service from pending services
        setPendingServices((prevServices) =>
          prevServices.filter((service) => service.serviceId !== serviceId)
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        // Handle error
      });
  };

  return (
    <div className="pending-services-container">
      <h2>Pending Services</h2>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Customer Name</th>
              <th>Service Date</th>
              <th>Is Service Completed</th>
              <th>Product Name</th>
              <th>Is Free Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingServices.map((service) => (
              <tr key={service.serviceId}>
                <td>{service.serviceId}</td>
                <td>{service.customerName}</td>
                <td>{service.serviceDate}</td>
                <td>{service.isServiceCompleted ? "Yes" : "No"}</td>
                <td>{service.productName}</td>
                <td>{service.isFreeService ? "Yes" : "No"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => markServiceAsCompleted(service.serviceId)}
                  >
                    Mark as Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingServicesComponent;
