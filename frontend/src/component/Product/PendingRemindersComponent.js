import React, { useEffect, useState } from "react";
import {
  getPendingReminders,
  markReminderAsCompletedByProductId,
} from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import CustomerDetailsModal from "../DetailsModal/CustomerDetailsModal";
import ProductCard from "./ProductCard";

const PendingRemindersComponent = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchPendingReminders = async () => {
      try {
        const data = await getPendingReminders();
        setProducts(data);
      } catch (error) {
        setModalMessage(error.message);
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingReminders();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleMarkAsCompleted = async (event, productId) => {
    event.stopPropagation();
    setIsLoading(true);
    try {
      await markReminderAsCompletedByProductId(productId);
      setProducts((prev) =>
        prev.filter((product) => product.productId !== productId)
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
      <h2>Reminders</h2>
      {products.length > 0 ? (
        <div className="card-item-list">
          {products.map((product) => (
            <div
              className="card-item"
              key={product.productId}
              onClick={() => handleProductSelect(product)}
            >
              <ProductCard product={product} />
              <button
                onClick={(event) =>
                  handleMarkAsCompleted(event, product.productId)
                }
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Reminders</p>
      )}
      <ErrorMessageModel
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      {selectedProduct && (
        <CustomerDetailsModal
          selectedProduct={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default PendingRemindersComponent;
