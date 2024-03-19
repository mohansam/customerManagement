import React, { useState } from "react";
import ProductsListComponent from "../component/Product/ProductsListComponent";
import CreateNewServiceComponent from "../component/Service/CreateNewServiceComponent";

const ProductToServiceWorkflow = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
