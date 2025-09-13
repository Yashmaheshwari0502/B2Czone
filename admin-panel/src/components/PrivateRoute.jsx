import { useAdminAuth } from "../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin/login" replace />;
};

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  color: "#666",
};

const spinnerStyle = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
  marginBottom: "1rem",
};

export default PrivateRoute;