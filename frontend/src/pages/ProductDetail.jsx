import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success message or notification
    alert('Product added to cart!');
  };

  if (loading) {
    return <div style={loadingStyle}>Loading product...</div>;
  }

  if (!product) {
    return <div style={notFoundStyle}>Product not found</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={productDetailStyle}>
        <div style={imageContainerStyle}>
          <img 
            src={product.image} 
            alt={product.name}
            style={imageStyle}
          />
        </div>
        
        <div style={infoStyle}>
          <h1 style={titleStyle}>{product.name}</h1>
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
          
          <div style={quantityStyle}>
            <label style={quantityLabelStyle}>Quantity:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={quantitySelectStyle}
              disabled={product.stock === 0}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={addToCartButtonStyle}
          >
            Add to Cart
          </button>
          
          <div style={detailsStyle}>
            <h3>Product Details</h3>
            <p><strong>Brand:</strong> {product.brand || 'Not specified'}</p>
            <p><strong>Unit:</strong> {product.unit}</p>
            <p><strong>Category:</strong> {product.category?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.2rem',
};

const notFoundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.5rem',
  color: '#666',
};

const productDetailStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle = {
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  borderRadius: '8px',
};

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const titleStyle = {
  fontSize: '2rem',
  color: '#333',
  marginBottom: '0.5rem',
};

const descriptionStyle = {
  fontSize: '1.1rem',
  color: '#666',
  lineHeight: '1.6',
};

const priceContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const priceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#007bff',
};

const originalPriceStyle = {
  fontSize: '1.2rem',
  color: '#999',
  textDecoration: 'line-through',
};

const stockStyle = {
  fontSize: '1.1rem',
  color: '#28a745',
  fontWeight: '600',
};

const quantityStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const quantityLabelStyle = {
  fontWeight: '600',
  color: '#333',
};

const quantitySelectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
};

const addToCartButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  fontWeight: '600',
};

const detailsStyle = {
  marginTop: '2rem',
  paddingTop: '2rem',
  borderTop: '1px solid #eee',
};

export default ProductDetail;