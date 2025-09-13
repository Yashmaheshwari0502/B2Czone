import { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          API.get('/products'),
          API.get('/categories')
        ]);
        
        setProducts(productsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => 
    selectedCategory ? product.category._id === selectedCategory : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  if (loading) {
    return <div style={loadingStyle}>Loading products...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={filtersStyle}>
        <div style={filterGroupStyle}>
          <label style={labelStyle}>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div style={filterGroupStyle}>
          <label style={labelStyle}>Sort By:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div style={productsGridStyle}>
        {sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div style={noProductsStyle}>
          <h3>No products found</h3>
          <p>Try selecting a different category or check back later.</p>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.2rem',
};

const filtersStyle = {
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const filterGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle = {
  fontWeight: '600',
  color: '#333',
};

const selectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
};

const productsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
};

const noProductsStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666',
};

export default Products;