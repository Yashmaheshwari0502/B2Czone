import { useState, useEffect } from "react";
import API from "../api/axios";
import { useAdminAuth } from "../context/AdminAuthContext";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useAdminAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        API.get("/products?limit=1"), // Just get count
        API.get("/orders?limit=5"),   // Recent orders
        API.get("/auth/me")           // Just to verify auth
      ]);

      // Calculate total revenue from orders
      const orders = ordersRes.data.data || [];
      const revenue = orders.reduce((total, order) => total + order.totalAmount, 0);

      setStats({
        totalProducts: productsRes.data.count || 0,
        totalOrders: ordersRes.data.count || 0,
        totalUsers: 0, // You might want to create a users endpoint
        revenue: revenue
      });

      setRecentOrders(orders);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Admin Dashboard</h1>
        <p style={welcomeStyle}>Welcome back, {admin?.name}!</p>
      </div>

      {/* Statistics Cards */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statIconStyle}>📦</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>{stats.totalProducts}</h3>
            <p style={statLabelStyle}>Total Products</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={statIconStyle}>🛒</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>{stats.totalOrders}</h3>
            <p style={statLabelStyle}>Total Orders</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={statIconStyle}>👥</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>{stats.totalUsers}</h3>
            <p style={statLabelStyle}>Total Users</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={statIconStyle}>💰</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>₹{stats.revenue.toFixed(2)}</h3>
            <p style={statLabelStyle}>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>No orders yet</p>
          </div>
        ) : (
          <div style={ordersTableStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Order ID</th>
                  <th style={tableHeaderStyle}>Customer</th>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id} style={tableRowStyle}>
                    <td style={tableCellStyle}>{order._id.slice(-8)}</td>
                    <td style={tableCellStyle}>{order.user?.name || "Guest"}</td>
                    <td style={tableCellStyle}>₹{order.totalAmount}</td>
                    <td style={tableCellStyle}>
                      <span style={statusStyle(order.orderStatus)}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Quick Actions</h2>
        <div style={actionsGridStyle}>
          <button style={actionButtonStyle} onClick={() => window.location.href = "/admin/products"}>
            📦 Manage Products
          </button>
          <button style={actionButtonStyle} onClick={() => window.location.href = "/admin/orders"}>
            🛒 View Orders
          </button>
          <button style={actionButtonStyle}>
            👥 Manage Users
          </button>
          <button style={actionButtonStyle}>
            📊 View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "2rem",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "0.5rem",
};

const welcomeStyle = {
  fontSize: "1.1rem",
  color: "#666",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
  marginBottom: "3rem",
};

const statCardStyle = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const statIconStyle = {
  fontSize: "2rem",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const statContentStyle = {
  flex: 1,
};

const statNumberStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 0.25rem 0",
};

const statLabelStyle = {
  color: "#666",
  margin: 0,
};

const sectionStyle = {
  marginBottom: "3rem",
};

const sectionTitleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1.5rem",
};

const ordersTableStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeaderStyle = {
  backgroundColor: "#f8f9fa",
  padding: "1rem",
  textAlign: "left",
  fontWeight: "600",
  color: "#333",
  borderBottom: "1px solid #eee",
};

const tableRowStyle = {
  borderBottom: "1px solid #eee",
  "&:last-child": {
    borderBottom: "none",
  },
};

const tableCellStyle = {
  padding: "1rem",
  color: "#666",
};

const statusStyle = (status) => ({
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "600",
  display: "inline-block",
  backgroundColor: 
    status === "delivered" ? "#d4edda" :
    status === "cancelled" ? "#f8d7da" :
    status === "shipped" ? "#cce5ff" :
    "#fff3cd",
  color: 
    status === "delivered" ? "#155724" :
    status === "cancelled" ? "#721c24" :
    status === "shipped" ? "#004085" :
    "#856404",
});

const actionsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
};

const actionButtonStyle = {
  padding: "1.5rem",
  backgroundColor: "white",
  border: "2px solid #007bff",
  borderRadius: "8px",
  color: "#007bff",
  fontSize: "1.1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#007bff",
    color: "white",
  },
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "3rem",
  color: "#666",
  backgroundColor: "white",
  borderRadius: "8px",
};

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  color: "#666",
};

export default Dashboard;