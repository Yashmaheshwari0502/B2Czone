import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    deliveryAddress: user?.address || {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    paymentMethod: 'cod'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: getCartTotal() + 40, // Adding delivery charge
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod
      };

      const response = await API.post('/orders', orderData);
      
      // Clear cart on successful order
      clearCart();
      
      // Redirect to order confirmation page
      navigate('/profile', { 
        state: { 
          message: 'Order placed successfully!',
          orderId: response.data.data._id
        }
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={emptyStyle}>
        <h2>Your cart is empty</h2>
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
      <h2 style={titleStyle}>Checkout</h2>
      
      <div style={checkoutStyle}>
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <h3 style={sectionTitleStyle}>Delivery Address</h3>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Street Address</label>
              <input
                type="text"
                name="address.street"
                value={formData.deliveryAddress.street}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            
            <div style={inputRowStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.deliveryAddress.city}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.deliveryAddress.state}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.deliveryAddress.pincode}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            
            <h3 style={sectionTitleStyle}>Payment Method</h3>
            
            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  style={radioStyle}
                />
                Cash on Delivery
              </label>
              
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                  style={radioStyle}
                />
                UPI
              </label>
              
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  style={radioStyle}
                />
                Credit/Debit Card
              </label>
            </div>
            
            {error && <div style={errorStyle}>{error}</div>}
            
            <button 
              type="submit" 
              disabled={loading}
              style={submitButtonStyle}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div style={summaryStyle}>
          <h3 style={sectionTitleStyle}>Order Summary</h3>
          
          <div style={orderItemsStyle}>
            {items.map(item => (
              <div key={item.product._id} style={orderItemStyle}>
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div style={totalBreakdownStyle}>
            <div style={breakdownItemStyle}>
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div style={breakdownItemStyle}>
              <span>Delivery:</span>
              <span>₹40.00</span>
            </div>
            
            <div style={totalStyle}>
              <span>Total:</span>
              <span>₹{(getCartTotal() + 40).toFixed(2)}</span>
            </div>
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

const titleStyle = {
  marginBottom: '2rem',
  color: '#333',
};

const checkoutStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '2rem',
};

const formContainerStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const sectionTitleStyle = {
  color: '#333',
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid #007bff',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const inputRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
};

const labelStyle = {
  fontWeight: '600',
  color: '#333',
  fontSize: '0.9rem',
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
};

const radioGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
};

const radioStyle = {
  margin: 0,
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '0.75rem',
  borderRadius: '4px',
  fontSize: '0.9rem',
};

const submitButtonStyle = {
  padding: '1rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  fontWeight: '600',
};

const summaryStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  height: 'fit-content',
};

const orderItemsStyle = {
  marginBottom: '1.5rem',
};

const orderItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
  fontSize: '0.9rem',
  color: '#666',
};

const totalBreakdownStyle = {
  borderTop: '1px solid #eee',
  paddingTop: '1rem',
};

const breakdownItemStyle = {
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

const emptyStyle = {
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

export default Checkout;