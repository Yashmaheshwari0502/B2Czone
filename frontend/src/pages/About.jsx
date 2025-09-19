const About = () => {
  return (
    <div>
      {/* About Section */}
      <section style={aboutSectionStyle}>
        <div style={containerStyle}>
          <div style={aboutContentStyle}>
            <h1 style={aboutTitleStyle}>About B2Czone</h1>
            <p style={aboutTextStyle}>
              Welcome to <strong>B2Czone</strong> — your one-stop destination for all
              home-making materials. We believe in making your life easier by
              delivering high-quality groceries, snacks, sanitary, plumbing,
              hardware, and household essentials right to your doorstep in
              minutes.
            </p>
            <p style={aboutTextStyle}>
              Our mission is to provide a seamless shopping experience with
              speed, affordability, and reliability at its core. Whether you’re
              restocking your kitchen, fixing your bathroom, or buying daily
              essentials, B2Czone has got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={missionSectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitleStyle}>Our Mission</h2>
          <p style={missionTextStyle}>
            To revolutionize the way people shop for household essentials by
            offering ultra-fast delivery, top-notch products, and excellent
            customer service. At B2Czone, we aim to save you time so you can
            focus on the things that truly matter.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section style={teamSectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitleStyle}>Meet Our Team</h2>
          <div style={teamGridStyle}>
            <div style={teamCardStyle}>
              <img
                src="/assets/images/founder.jpg"
                alt="Founder"
                style={teamImageStyle}
              />
              <h3 style={teamNameStyle}>Rajesh Maheshwari</h3>
              <p style={teamRoleStyle}>Founder</p>
            </div>

            <div style={teamCardStyle}>
              <img
                src="/assets/images/coowner.jpg"
                alt="Co-owner"
                style={teamImageStyle}
              />
              <h3 style={teamNameStyle}>Shray Maheshwari</h3>
              <p style={teamRoleStyle}>Marketing Head & Co-owner</p>
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

const aboutSectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: "4rem 0",
  textAlign: "center",
};

const aboutContentStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

const aboutTitleStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "2rem",
};

const aboutTextStyle = {
  fontSize: "1.2rem",
  color: "#555",
  lineHeight: "1.8",
  marginBottom: "1.5rem",
};

const missionSectionStyle = {
  padding: "4rem 0",
  backgroundColor: "white",
  textAlign: "center",
};

const sectionTitleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "2rem",
};

const missionTextStyle = {
  fontSize: "1.2rem",
  color: "#555",
  lineHeight: "1.8",
  maxWidth: "800px",
  margin: "0 auto",
};

const teamSectionStyle = {
  padding: "4rem 0",
  backgroundColor: "#f8f9fa",
  textAlign: "center",
};

const teamGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  marginTop: "2rem",
};

const teamCardStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const teamImageStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "1rem",
};

const teamNameStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "0.5rem",
};

const teamRoleStyle = {
  fontSize: "1rem",
  color: "#777",
};

export default About;
