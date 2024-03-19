const ProductCard = ({ customer }) => {
  return (
    <div className="card-item">
      <h3>{customer.customerName}</h3>
      <p>Address: {customer.customerAddress}</p>
      <p>Mobile Number:: {customer.customerMobileNum}</p>
    </div>
  );
};

export default ProductCard;
