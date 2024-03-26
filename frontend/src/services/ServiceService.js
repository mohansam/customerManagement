// services/ServiceService.js

export const createNewService = async (serviceData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/service/createNewService`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const getPendingServices = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/service/getPendingServices`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pending services:", error);
    throw error;
  }
};

export const getUpcomingServices = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/service/getUpcomingServices`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pending services:", error);
    throw error;
  }
};

export const markServiceAsCompleted = async (serviceId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/service/markServiceAsCompletedByServiceId/${serviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error marking service as completed:", error);
    throw error;
  }
};

export const getServicesByProductId = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/service/getAllTheServicesBelongsToProductId/${productId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching customer by mobile number:", error);
    throw error;
  }
};
