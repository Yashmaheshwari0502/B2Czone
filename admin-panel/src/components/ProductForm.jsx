import { useState, useEffect } from "react";
import API from "../api/axios";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    stock: "",
    unit: "",
    brand: "",
    isAvailable: true
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        image: product.image || "",
        category: product.category?._id || product.category || "",
        stock: product.stock || "",
        unit: product.unit || "",
        brand: product.brand || "",
        isAvailable: product.isAvailable !== undefined ? product.isAvailable : true
      });
    }
    fetchCategories();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock),
        category: formData.category
      };

      let response;
      if (product) {
        // Update existing product
        response = await API.put(`/products/${product._id}`, productData);
      } else {
        // Create new product
        response = await API.post("/products", productData);
      }

      onSave(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRowStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter product name"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={inputStyle}
              placeholder="0.00"
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              style={inputStyle}
              placeholder="0.00"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
              placeholder="0"
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Unit *</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., 1kg, 500ml, 1 piece"
            />
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            style={textareaStyle}
            placeholder="Enter product description"
          />
        </div>

        <div style={formRowStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter brand name"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div style={checkboxGroupStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              style={checkboxStyle}
            />
            Product is available for sale
          </label>
        </div>

        <div style={buttonGroupStyle}>
          <button
            type="button"
            onClick={onCancel}
            style={cancelButtonStyle}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={submitButtonStyle}
            disabled={loading}
          >
            {loading ? "Saving..." : (product ? "Update Product" : "Add Product")}
          </button>
        </div>
      </form>
    </div>
  );
};

const formContainerStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  maxWidth: "800px",
  margin: "0 auto",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "2rem",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const formRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle = {
  fontWeight: "600",
  color: "#333",
  fontSize: "0.9rem",
};

const inputStyle = {
  padding: "0.75rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
  fontFamily: "inherit",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "80px",
  fontFamily: "inherit",
};

const checkboxGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  fontWeight: "500",
};

const checkboxStyle = {
  margin: 0,
  width: "18px",
  height: "18px",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
  marginTop: "2rem",
};

const submitButtonStyle = {
  padding: "0.75rem 2rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  minWidth: "140px",
};

const cancelButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: "#6c757d",
};

const errorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "1rem",
  borderRadius: "4px",
  marginBottom: "1rem",
  border: "1px solid #f5c6cb",
};

export default ProductForm;