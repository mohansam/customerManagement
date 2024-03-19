const ProductCard = ({ product }) => {
  return (
    <div className="card-item">
      <h3>{product.productName}</h3>
      <p>Model: {product.model}</p>
      <p>Membrane: {product.membrane}</p>
      <p>Pump: {product.pump}</p>
      <p>Power Supply: {product.powerSupply}</p>
      <p>
        Date of Installation:{" "}
        {new Date(product.dateOfInstallation).toLocaleDateString()}
      </p>
      <p>Warranty: {product.warranty}</p>
    </div>
  );
};

export default ProductCard;
