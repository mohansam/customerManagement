import React, { useEffect, useState } from "react";
import "./PendingServicesComponent.css";

const PendingServicesComponent = () => {
  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    fetch("/api/v1/service/getPendingServices")
      .then((response) => response.json())
      .then((data) => setPendingServices(data))
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  return (
    <div className="pending-services-container">
      <h2>Pending Services</h2>
      <table>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Customer Name</th>
            <th>Service Date</th>
            <th>Is Service Completed</th>
            <th>Product Name</th>
            <th>Is Free Service</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingServicesComponent;
