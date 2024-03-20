import React, { useState } from "react";
import ProductsListComponent from "../component/Product/ProductsListComponent";
import ServiceDetailsModal from "../component/DetailsModal/ServiceDetailsModal";

const CheckCustomerDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    console.log(product);
    setSelectedProduct(product);
  };

  return (
    <div>
      <ProductsListComponent
        onSelectProduct={handleSelectProduct}
        displayMessage={"Check Customer Details"}
      />
      <ServiceDetailsModal
        serviceObject={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default CheckCustomerDetails;
