const ProductCard = ({ customer }) => {
  return (
    <>
      <h3>{customer.customerName}</h3>
      <p>Address: {customer.customerAddress}</p>
      <p>Mobile Number:: {customer.customerMobileNum}</p>
    </>
  );
};

export default ProductCard;
