import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { items } = useCart();
  const { user } = useAuth();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <h1 style={logoTextStyle}>Blinkit</h1>
        </Link>

        <nav style={navStyle}>
          <Link to="/products" style={navLinkStyle}>Products</Link>
          
          <Link to="/cart" style={cartLinkStyle}>
            Cart ({cartItemsCount})
          </Link>

          {user ? (
            <span style={userStyle}>Welcome, {user.name}</span>
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

const headerStyle = {
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  padding: "1rem 0",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  textDecoration: "none",
};

const logoTextStyle = {
  color: "#007bff",
  fontSize: "2rem",
  fontWeight: "bold",
  margin: 0,
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
};

const navLinkStyle = {
  color: "#333",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "1.1rem",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "all 0.3s ease",
};

const cartLinkStyle = {
  ...navLinkStyle,
  backgroundColor: "#007bff",
  color: "white",
  padding: "0.5rem 1.5rem",
};

const authLinksStyle = {
  display: "flex",
  gap: "1rem",
};

const userStyle = {
  color: "#666",
  fontWeight: "500",
};

export default Header;