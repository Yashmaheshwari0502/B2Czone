import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div style={cardStyle}>
      <img 
        src={product.image} 
        alt={product.name}
        style={imageStyle}
      />
      <div style={contentStyle}>
        <h3 style={nameStyle}>{product.name}</h3>
        <p style={descriptionStyle}>{product.description}</p>
        
        <div style={priceContainerStyle}>
          <span style={priceStyle}>₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={originalPriceStyle}>₹{product.originalPrice}</span>
          )}
        </div>
        
        <div style={stockStyle}>
          {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={buttonStyle}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const contentStyle = {
  padding: '1rem',
};

const nameStyle = {
  fontSize: '1.1rem',
  marginBottom: '0.5rem',
  color: '#333',
};

const descriptionStyle = {
  color: '#666',
  marginBottom: '1rem',
  fontSize: '0.9rem',
};

const priceContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
};

const priceStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#007bff',
};

const originalPriceStyle = {
  fontSize: '0.9rem',
  color: '#999',
  textDecoration: 'line-through',
};

const stockStyle = {
  fontSize: '0.9rem',
  color: '#28a745',
  marginBottom: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default ProductCard;