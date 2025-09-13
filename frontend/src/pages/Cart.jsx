import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div style={emptyCartStyle}>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button 
          onClick={() => navigate('/products')}
          style={shopButtonStyle}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Shopping Cart</h2>
      
      <div style={cartStyle}>
        <div style={itemsStyle}>
          {items.map(item => (
            <div key={item.product._id} style={cartItemStyle}>
              <img 
                src={item.product.image} 
                alt={item.product.name}
                style={itemImageStyle}
              />
              
              <div style={itemInfoStyle}>
                <h3 style={itemNameStyle}>{item.product.name}</h3>
                <p style={itemPriceStyle}>₹{item.product.price}</p>
                <p style={itemUnitStyle}>{item.product.unit}</p>
              </div>
              
              <div style={quantityControlsStyle}>
                <button 
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  style={quantityButtonStyle}
                >
                  -
                </button>
                
                <span style={quantityDisplayStyle}>{item.quantity}</span>
                
                <button 
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  style={quantityButtonStyle}
                >
                  +
                </button>
              </div>
              
              <div style={itemTotalStyle}>
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item.product._id)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div style={summaryStyle}>
          <h3 style={summaryTitleStyle}>Order Summary</h3>
          
          <div style={summaryItemStyle}>
            <span>Subtotal:</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          
          <div style={summaryItemStyle}>
            <span>Delivery:</span>
            <span>₹40.00</span>
          </div>
          
          <div style={totalStyle}>
            <span>Total:</span>
            <span>₹{(getCartTotal() + 40).toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            style={checkoutButtonStyle}
          >
            Proceed to Checkout
          </button>
          
          <button 
            onClick={clearCart}
            style={clearCartButtonStyle}
          >
            Clear Cart
          </button>
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

const titleStyle = {
  marginBottom: '2rem',
  color: '#333',
};

const cartStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '2rem',
};

const itemsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const cartItemStyle = {
  display: 'grid',
  gridTemplateColumns: '100px 1fr auto auto auto',
  gap: '1rem',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const itemImageStyle = {
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '4px',
};

const itemInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const itemNameStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#333',
};

const itemPriceStyle = {
  fontSize: '1rem',
  color: '#007bff',
  fontWeight: '600',
};

const itemUnitStyle = {
  fontSize: '0.9rem',
  color: '#666',
};

const quantityControlsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const quantityButtonStyle = {
  padding: '0.25rem 0.5rem',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};

const quantityDisplayStyle = {
  padding: '0.25rem 0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  minWidth: '40px',
  textAlign: 'center',
};

const itemTotalStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#333',
};

const removeButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const summaryStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  height: 'fit-content',
};

const summaryTitleStyle = {
  marginBottom: '1rem',
  color: '#333',
};

const summaryItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
  color: '#666',
};

const totalStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid #eee',
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#333',
};

const checkoutButtonStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginTop: '1rem',
  fontWeight: '600',
};

const clearCartButtonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '0.5rem',
};

const emptyCartStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60vh',
  textAlign: 'center',
};

const shopButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginTop: '1rem',
};

export default Cart;