import React, { useState } from "react";
import ProductsListComponent from "../component/Product/ProductsListComponent";
import ServiceDetailsModal from "../component/DetailsModal/ServiceDetailsModal";

const CheckCustomerDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <ProductsListComponent
        onSelectProduct={handleSelectProduct}
        displayMessage={"Check Customer Details"}
      />
      {selectedProduct && (
        <ServiceDetailsModal
          selectedProduct={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CheckCustomerDetails;
