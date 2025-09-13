const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h3 style={footerTitleStyle}>B2Czone</h3>
            <p style={footerTextStyle}>Home making material delivered in minutes</p>
          </div>
          
          <div style={sectionStyle}>
            <h4 style={footerSubtitleStyle}>Quick Links</h4>
            <ul style={listStyle}>
              <li><a href="/products" style={linkStyle}>Products</a></li>
              <li><a href="/about" style={linkStyle}>About Us</a></li>
              <li><a href="/contact" style={linkStyle}>Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div style={copyrightStyle}>
          <p style={copyrightTextStyle}>&copy; 2025 B2Czone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
};

const footerStyle = {
  backgroundColor: "#343a40",
  color: "white",
  padding: "3rem 0 1rem",
  marginTop: "auto",
};

const contentStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  marginBottom: "2rem",
};

const sectionStyle = {
  marginBottom: "1rem",
};

const footerTitleStyle = {
  fontSize: "1.5rem",
  marginBottom: "0.5rem",
  color: "#007bff",
};

const footerTextStyle = {
  color: "#ddd",
  lineHeight: "1.6",
};

const footerSubtitleStyle = {
  fontSize: "1.2rem",
  marginBottom: "1rem",
  color: "white",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
};

const linkStyle = {
  color: "#ddd",
  textDecoration: "none",
  lineHeight: "2",
  transition: "color 0.3s ease",
};

const copyrightStyle = {
  borderTop: "1px solid #495057",
  paddingTop: "1rem",
  textAlign: "center",
};

const copyrightTextStyle = {
  color: "#999",
  margin: 0,
};

export default Footer;