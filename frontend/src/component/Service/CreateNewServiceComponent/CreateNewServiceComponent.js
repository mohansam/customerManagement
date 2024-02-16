import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateNewServiceComponent.css";

const CreateNewServiceComponent = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    serviceDate: "",
    isServiceCompleted: false,
    productName: "",
    isFreeService: false,
    customerName: "",
  });

  const [customerList, setCustomerList] = useState([]);
  const [suggestedCustomers, setSuggestedCustomers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchCustomersByName = async () => {
    try {
      setIsSearching(true);
      const response = await fetch(
        `/api/v1/customer/getCustomerByName?customerName=${serviceData.customerName}`
      );
      const customers = await response.json();
      setCustomerList(customers);
      setSuggestedCustomers(customers);
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      // Handle error
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (serviceData.customerName.trim() !== "") {
      fetchCustomersByName();
    }
  }, [serviceData.customerName]);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setServiceData({ ...serviceData, customerName: value });

    if (value.trim() !== "") {
      const filteredCustomers = customerList.filter((customer) =>
        customer.customerName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedCustomers(filteredCustomers);
    } else {
      setSuggestedCustomers(customerList);
    }
  };

  const handleCustomerSelect = (customerId, customerName) => {
    setServiceData({ ...serviceData, customerId, customerName });
    setSuggestedCustomers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/service/createNewService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        // Get the current date
        const currentDate = new Date().toISOString().split("T")[0];

        // Convert serviceDate to a Date object
        const selectedDate = new Date(serviceData.serviceDate);

        if (selectedDate > new Date(currentDate)) {
          // If serviceDate is in the future, navigate to "upcoming-services"
          navigate("/upcoming-services");
        } else {
          // If serviceDate is today or in the past, navigate to "pending-services"
          navigate("/pending-services");
        }
      } else {
        console.error("Request failed");
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setServiceData({ ...serviceData, [name]: newValue });
  };

  const isFormValid = () => {
    const { serviceDate, productName } = serviceData;
    return serviceDate.trim() !== "" && productName.trim() !== "";
  };

  return (
    <div className="create-service-container">
      <Link to="/" className="create-service-back-link">
        &lt; Back to Home
      </Link>
      <h2>Create New Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={serviceData.customerName}
            onChange={handleSearchInputChange}
          />
          {isSearching && <div>Loading...</div>}
          {suggestedCustomers.length > 0 && (
            <ul className="customer-suggestions">
              {suggestedCustomers.map((customer) => (
                <li
                  key={customer.customerId}
                  onClick={() =>
                    handleCustomerSelect(
                      customer.customerId,
                      customer.customerName
                    )
                  }
                >
                  {customer.customerName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="serviceDate">Service Date:</label>
          <input
            type="date"
            id="serviceDate"
            name="serviceDate"
            value={serviceData.serviceDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isServiceCompleted">Service Completed:</label>
          <select
            id="isServiceCompleted"
            name="isServiceCompleted"
            value={serviceData.isServiceCompleted}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={serviceData.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isFreeService">Free Service:</label>
          <select
            id="isFreeService"
            name="isFreeService"
            value={serviceData.isFreeService}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid()}
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewServiceComponent;
