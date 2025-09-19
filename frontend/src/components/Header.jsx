import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
    // Optional: Redirect to home after logout
    window.location.href = '/';
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <h1 style={logoTextStyle}>B2CZONE</h1>
        </Link>

        <nav style={navStyle}>
          <Link to="/products" style={navLinkStyle}>Products</Link>
          
          <Link to="/cart" style={cartLinkStyle}>
            Cart ({getCartItemsCount()})
          </Link>

          {user ? (
            <div style={userMenuStyle}>
              <span style={userWelcomeStyle}>Welcome, {user.name}</span>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </div>
          ) : (
            <div style={authLinksStyle}>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/register" style={navLinkStyle}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// Add these new styles:
const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const userWelcomeStyle = {
  color: '#333',
  fontWeight: '500',
};

const logoutButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

// Keep the existing styles...
const headerStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '1rem 0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  textDecoration: 'none',
};

const logoTextStyle = {
  color: '#007bff',
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0,
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
};

const navLinkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1.1rem',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
};

const cartLinkStyle = {
  ...navLinkStyle,
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.5rem 1.5rem',
};

const authLinksStyle = {
  display: 'flex',
  gap: '1rem',
};

export default Header;