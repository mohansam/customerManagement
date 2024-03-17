import React, { useState } from "react";
import ProductsListComponent from "../component/Product/ProductsListComponent"; // Adjust the path as necessary
import CreateNewServiceComponent from "../component/Service/CreateNewServiceComponent/CreateNewServiceComponent";

const ProductToServiceWorkflow = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handler to be called when a product is selected from the list
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      {!selectedProduct ? (
        <ProductsListComponent onSelectProduct={handleSelectProduct} />
      ) : (
        <CreateNewServiceComponent selectedProduct={selectedProduct} />
      )}
    </div>
  );
};

export default ProductToServiceWorkflow;
