import { useState, useEffect } from "react";
import API from "../api/axios";
import ProductForm from "../components/ProductForm";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      setProducts(response.data.data || []);
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await API.delete(`/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      setError("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = (savedProduct) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product =>
        product._id === savedProduct._id ? savedProduct : product
      ));
    } else {
      // Add new product
      setProducts([...products, savedProduct]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Product Management</h1>
        <button onClick={handleCreateProduct} style={addButtonStyle}>
          + Add New Product
        </button>
      </div>

      {error && (
        <div style={errorStyle}>
          {error}
          <button onClick={() => setError("")} style={closeErrorStyle}>×</button>
        </div>
      )}

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div style={summaryStyle}>
            <p>Total Products: <strong>{products.length}</strong></p>
          </div>

          {products.length === 0 ? (
            <div style={emptyStateStyle}>
              <h3>No products found</h3>
              <p>Click "Add New Product" to get started.</p>
            </div>
          ) : (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Image</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Category</th>
                    <th style={tableHeaderStyle}>Price</th>
                    <th style={tableHeaderStyle}>Stock</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} style={tableRowStyle}>
                      <td style={tableCellStyle}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={imageStyle}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50";
                          }}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <div style={productInfoStyle}>
                          <strong>{product.name}</strong>
                          <small style={descriptionStyle}>{product.description}</small>
                        </div>
                      </td>
                      <td style={tableCellStyle}>
                        {getCategoryName(product.category)}
                      </td>
                      <td style={tableCellStyle}>
                        <div>
                          <strong>₹{product.price}</strong>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <div style={originalPriceStyle}>
                              <s>₹{product.originalPrice}</s>
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={stockStyle(product.stock)}>
                          {product.stock}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={statusStyle(product.isAvailable)}>
                          {product.isAvailable ? "Available" : "Disabled"}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={actionsStyle}>
                          <button
                            onClick={() => handleEditProduct(product)}
                            style={editButtonStyle}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            style={deleteButtonStyle}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const containerStyle = {
  padding: "2rem",
  maxWidth: "1400px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  flexWrap: "wrap",
  gap: "1rem",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#333",
  margin: 0,
};

const addButtonStyle = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const summaryStyle = {
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "6px",
  marginBottom: "1.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const tableContainerStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "800px",
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
  "&:hover": {
    backgroundColor: "#f8f9fa",
  },
};

const tableCellStyle = {
  padding: "1rem",
  verticalAlign: "top",
};

const imageStyle = {
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "4px",
};

const productInfoStyle = {
  maxWidth: "200px",
};

const descriptionStyle = {
  display: "block",
  color: "#666",
  fontSize: "0.9rem",
  marginTop: "0.25rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const originalPriceStyle = {
  color: "#999",
  fontSize: "0.8rem",
  textDecoration: "line-through",
};

const stockStyle = (stock) => ({
  fontWeight: "600",
  color: stock > 10 ? "#28a745" : stock > 0 ? "#ffc107" : "#dc3545",
});

const statusStyle = (isAvailable) => ({
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "600",
  display: "inline-block",
  backgroundColor: isAvailable ? "#d4edda" : "#f8d7da",
  color: isAvailable ? "#155724" : "#721c24",
});

const actionsStyle = {
  display: "flex",
  gap: "0.5rem",
};

const editButtonStyle = {
  padding: "0.5rem",
  backgroundColor: "#ffc107",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
};

const deleteButtonStyle = {
  padding: "0.5rem",
  backgroundColor: "#dc3545",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  color: "white",
};

const errorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "1rem",
  borderRadius: "4px",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeErrorStyle = {
  backgroundColor: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#721c24",
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

export default ProductsAdmin;