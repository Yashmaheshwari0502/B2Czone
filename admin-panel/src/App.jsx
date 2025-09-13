import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AdminAuthProvider } from "./context/AdminAuthContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProductsAdmin from "./pages/ProductsAdmin"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/products" element={
              <PrivateRoute>
                <ProductsAdmin />
              </PrivateRoute>
            } />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AdminAuthProvider>
  )
}

export default App