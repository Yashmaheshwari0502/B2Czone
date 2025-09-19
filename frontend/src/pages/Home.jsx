import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={containerStyle}>
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Construction essentials Delivered in Minutes</h1>
            <p style={heroSubtitleStyle}>
             Hardware, electricals, and plumbing essentials — straight to your doorstep fast and hassle-free
            </p>
            <Link to="/products" style={ctaButtonStyle}>
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={featuredSectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitleStyle}>Featured Products</h2>
          
          <div style={productsGridStyle}>
            {/* Product cards will go here */}
            <div style={comingSoonStyle}>
              <h3>Products Coming Soon!</h3>
              <p>Awesome products will be displayed here</p>
            </div>
          </div>

          <div style={viewAllStyle}>
            <Link to="/products" style={viewAllButtonStyle}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
};

const heroSectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: "4rem 0",
  textAlign: "center",
};

const heroContentStyle = {
  maxWidth: "600px",
  margin: "0 auto",
};

const heroTitleStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1.5rem",
  lineHeight: "1.2",
};

const heroSubtitleStyle = {
  fontSize: "1.3rem",
  color: "#666",
  marginBottom: "2.5rem",
  lineHeight: "1.6",
};

const ctaButtonStyle = {
  display: "inline-block",
  padding: "1rem 2.5rem",
  backgroundColor: "#007bff",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "1.2rem",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

const featuredSectionStyle = {
  padding: "4rem 0",
  backgroundColor: "white",
};

const sectionTitleStyle = {
  textAlign: "center",
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "3rem",
};

const productsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
  marginBottom: "3rem",
};

const comingSoonStyle = {
  textAlign: "center",
  padding: "3rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  gridColumn: "1 / -1",
};

const viewAllStyle = {
  textAlign: "center",
};

const viewAllButtonStyle = {
  display: "inline-block",
  padding: "1rem 2rem",
  backgroundColor: "#28a745",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "1.1rem",
  fontWeight: "600",
};

export default Home;