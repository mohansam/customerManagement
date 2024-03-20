const ProductCard = ({ product }) => {
  return (
    <>
      <h3>{product.productName}</h3>
      <p>Model: {product.model}</p>
      <p>Membrane: {product.membrane}</p>
      <p>Pump: {product.pump}</p>
      <p>Power Supply: {product.powerSupply}</p>
      <p>
        Date of Installation:{" "}
        {new Date(product.dateOfInstallation).toLocaleDateString()}
      </p>
      <p>
        Next Scheduled Maintenance:
        {new Date(product.nextScheduledMaintenance).toLocaleDateString()}
      </p>
      <p>Mode Of Purchase: {product.modeOfPurchase}</p>
      <p>ReminderDays: {product.reminderDays}</p>
    </>
  );
};

export default ProductCard;
