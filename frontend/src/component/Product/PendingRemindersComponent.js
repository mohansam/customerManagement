import React, { useEffect, useState } from "react";
import { getPendingReminders } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import ProductCard from "./ProductCard";

const PendingRemindersComponent = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchPendingServices = async () => {
      try {
        const data = await getPendingReminders();
        setProducts(data);
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

  if (isLoading) {
    return <LoaderModal />;
  }

  return (
    <div className="container">
      <h2>Reminders</h2>
      {products.length > 0 ? (
        <div className="card-item-list">
          {products.map((product) => (
            <div className="card-item" key={product.productId}>
              <ProductCard product={product} />
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
    </div>
  );
};

export default PendingRemindersComponent;
