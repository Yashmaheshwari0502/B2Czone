import { createContext, useContext, useReducer, useEffect } from "react";
import API from "../api/axios";

const AdminAuthContext = createContext();

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, admin: action.payload, error: null };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload, admin: null };
    case "LOGOUT":
      return { ...state, admin: null, error: null };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  admin: null,
  loading: false,
  error: null,
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);

  // Check for existing admin session on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminUser");
    
    if (token && adminData) {
      try {
        const admin = JSON.parse(adminData);
        // Verify token is still valid by making a simple API call
        API.get("/auth/me")
          .then(() => {
            dispatch({ type: "LOGIN_SUCCESS", payload: admin });
          })
          .catch(() => {
            // Token is invalid, clear storage
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
          });
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });
    
    try {
      const response = await API.post("/auth/login", { email, password });
      const { token, ...adminData } = response.data;

      // Check if user is actually an admin
      if (adminData.role !== "admin") {
        throw new Error("Access denied. Admin privileges required.");
      }

      // Store token and admin data
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(adminData));
      
      dispatch({ type: "LOGIN_SUCCESS", payload: adminData });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: message });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Check if current user has admin role
  const isAdmin = () => {
    return state.admin?.role === "admin";
  };

  // Get admin authentication token
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Update admin profile
  const updateProfile = async (profileData) => {
    try {
      const response = await API.put("/auth/update", profileData);
      const updatedAdmin = { ...state.admin, ...response.data };
      
      localStorage.setItem("adminUser", JSON.stringify(updatedAdmin));
      dispatch({ type: "LOGIN_SUCCESS", payload: updatedAdmin });
      
      return { success: true, data: updatedAdmin };
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      return { success: false, error: message };
    }
  };

  const value = {
    admin: state.admin,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError,
    isAdmin,
    getToken,
    updateProfile,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};