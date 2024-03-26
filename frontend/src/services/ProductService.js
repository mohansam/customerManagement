export const createNewProduct = async (productData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/createNewProduct`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getPendingReminders = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/getPendingReminders`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by customer mobile number:", error);
    throw error;
  }
};

export const markReminderAsCompletedByProductId = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/markReminderAsCompletedByProductId/${productId}`,
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
    console.error("Error fetching products by customer mobile number:", error);
    throw error;
  }
};

export const getProductsByCustomerMobileNum = async (mobileNum) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/getProductsByCustomerMobileNum?customerMobileNum=${mobileNum}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by customer mobile number:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/getProductById/${productId}`
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

export const getProductsByCustomerId = async (customerId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/getProductsByCustomerId/${customerId}`
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
