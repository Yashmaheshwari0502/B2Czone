import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get('/orders/myorders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>My Account</h2>
      
      <div style={tabsStyle}>
        <button 
          onClick={() => setActiveTab('profile')}
          style={activeTab === 'profile' ? activeTabStyle : tabStyle}
        >
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={activeTab === 'orders' ? activeTabStyle : tabStyle}
        >
          My Orders
        </button>
      </div>
      
      <div style={contentStyle}>
        {activeTab === 'profile' && (
          <div style={profileStyle}>
            <div style={infoCardStyle}>
              <h3 style={sectionTitleStyle}>Personal Information</h3>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <strong>Name:</strong> {user.name}
                </div>
                <div style={infoItemStyle}>
                  <strong>Email:</strong> {user.email}
                </div>
                <div style={infoItemStyle}>
                  <strong>Phone:</strong> {user.phone}
                </div>
              </div>
            </div>
            
            <div style={infoCardStyle}>
              <h3 style={sectionTitleStyle}>Address</h3>
              {user.address ? (
                <div style={addressStyle}>
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
                </div>
              ) : (
                <p>No address saved</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div style={ordersStyle}>
            {loading ? (
              <div style={loadingStyle}>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div style={noOrdersStyle}>
                <h3>No orders yet</h3>
                <p>Your order history will appear here.</p>
              </div>
            ) : (
              <div style={ordersListStyle}>
                {orders.map(order => (
                  <div key={order._id} style={orderCardStyle}>
                    <div style={orderHeaderStyle}>
                      <div>
                        <strong>Order ID:</strong> {order._id}
                      </div>
                      <div style={statusStyle(order.orderStatus)}>
                        {order.orderStatus}
                      </div>
                    </div>
                    
                    <div style={orderDetailsStyle}>
                      <div style={orderItemsStyle}>
                        {order.items.map(item => (
                          <div key={item.product._id} style={orderItemStyle}>
                            <span>{item.product.name} × {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div style={orderTotalStyle}>
                        <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
                      </div>
                      
                      <div style={orderMetaStyle}>
                        <span>Placed on: {new Date(order.createdAt).toLocaleDateString()}</span>
                        <span>Payment: {order.paymentMethod.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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

const tabsStyle = {
  display: 'flex',
  marginBottom: '2rem',
  borderBottom: '1px solid #ddd',
};

const tabStyle = {
  padding: '1rem 2rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '3px solid transparent',
  cursor: 'pointer',
  fontSize: '1rem',
  color: '#666',
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: '3px solid #007bff',
  color: '#007bff',
  fontWeight: '600',
};

const contentStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const profileStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};

const infoCardStyle = {
  padding: '1.5rem',
  border: '1px solid #eee',
  borderRadius: '8px',
};

const sectionTitleStyle = {
  marginBottom: '1rem',
  color: '#333',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid #007bff',
};

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1rem',
};

const infoItemStyle = {
  padding: '0.5rem 0',
  color: '#666',
};

const addressStyle = {
  color: '#666',
  lineHeight: '1.6',
};

const ordersStyle = {
  minHeight: '300px',
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: '#666',
};

const noOrdersStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666',
};

const ordersListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const orderCardStyle = {
  border: '1px solid #eee',
  borderRadius: '8px',
  overflow: 'hidden',
};

const orderHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #eee',
};

const statusStyle = (status) => ({
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  backgroundColor: 
    status === 'delivered' ? '#d4edda' :
    status === 'cancelled' ? '#f8d7da' :
    '#fff3cd',
  color: 
    status === 'delivered' ? '#155724' :
    status === 'cancelled' ? '#721c24' :
    '#856404',
});

const orderDetailsStyle = {
  padding: '1rem',
};

const orderItemsStyle = {
  marginBottom: '1rem',
};

const orderItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
  borderBottom: '1px solid #f8f9fa',
  color: '#666',
};

const orderTotalStyle = {
  textAlign: 'right',
  padding: '1rem 0',
  borderTop: '2px solid #eee',
  color: '#333',
  fontSize: '1.1rem',
};

const orderMetaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '1rem',
  borderTop: '1px solid #f8f9fa',
  fontSize: '0.9rem',
  color: '#999',
};

export default Profile;