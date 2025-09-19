const Contact = () => {
  return (
    <div>
      {/* Contact Section */}
      <section style={contactSectionStyle}>
        <div style={containerStyle}>
          <h1 style={contactTitleStyle}>Contact Us</h1>
          <p style={contactSubtitleStyle}>
            Have questions, feedback, or need help? Get in touch with us!
          </p>

          <div style={contactGridStyle}>
            {/* Contact Info */}
            <div style={infoCardStyle}>
              <h3 style={infoTitleStyle}>Our Office</h3>
              <p style={infoTextStyle}>
Plot No-64, Gyan Khand-1  
Indirapuram, Ghaziabad  
Uttar Pradesh, India - 201014 </p>

              <h3 style={infoTitleStyle}>Email</h3>
              <p style={infoTextStyle}>info@b2czone.com</p>

              <h3 style={infoTitleStyle}>Phone</h3>
              <p style={infoTextStyle}>+91 96507 00225</p>
            </div>

            {/* Contact Form */}
            <div style={formCardStyle}>
              <h3 style={infoTitleStyle}>Send us a Message</h3>
              <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  style={inputStyle}
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  required
                  style={textareaStyle}
                />
                <button type="submit" style={submitButtonStyle}>
                  Send Message
                </button>
              </form>
            </div>
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

const contactSectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: "4rem 0",
  textAlign: "center",
};

const contactTitleStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1rem",
};

const contactSubtitleStyle = {
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "3rem",
};

const contactGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "2rem",
  textAlign: "left",
};

const infoCardStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const infoTitleStyle = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#007bff",
  marginBottom: "0.5rem",
};

const infoTextStyle = {
  fontSize: "1rem",
  color: "#555",
  marginBottom: "1.5rem",
};

const formCardStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const inputStyle = {
  padding: "0.8rem 1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const textareaStyle = {
  padding: "0.8rem 1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  resize: "vertical",
};

const submitButtonStyle = {
  padding: "1rem",
  backgroundColor: "#28a745",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: "600",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Contact;
