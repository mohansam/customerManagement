// ProductCard.js
const ProductCard = ({ product, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>{product.name}</h3>
      {/* Display other product details */}
    </div>
  );
};

export default ProductCard;
