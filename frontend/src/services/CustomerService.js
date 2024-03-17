export const createNewCustomer = async (customerData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customer/createNewCustomer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      }
    );

    const data = await response.json(); // Always parse the JSON to get the response data

    if (!response.ok) {
      // If the response is not okay, throw an error with the message from the server
      throw new Error(data.message || "An unknown error occurred");
    }

    return data; // Return the response data if everything is okay
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error; // Rethrow the error to be handled or displayed by the calling component
  }
};

export const getCustomerByMobileNum = async (customerMobileNum) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customer/getCustomerByMobileNum?customerMobileNum=${customerMobileNum}`
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
