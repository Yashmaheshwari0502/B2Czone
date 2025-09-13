const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'Fruits & Vegetables',
    description: 'Fresh fruits and vegetables',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Dairy & Eggs',
    description: 'Milk, cheese, eggs and more',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Bakery',
    description: 'Bread, cakes and pastries',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Beverages',
    description: 'Soft drinks, juices and more',
    image: 'https://via.placeholder.com/150'
  }
];

const products = [
  {
    name: 'Fresh Apples',
    description: 'Fresh red apples, 1kg',
    price: 120,
    originalPrice: 150,
    image: 'https://via.placeholder.com/300',
    category: null, // Will be set after categories are created
    stock: 50,
    unit: '1kg',
    brand: 'Farm Fresh'
  },
  {
    name: 'Organic Milk',
    description: 'Fresh organic milk, 1L',
    price: 60,
    originalPrice: 70,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 30,
    unit: '1L',
    brand: 'Organic Farms'
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();

    // Add categories
    const createdCategories = await Category.insertMany(categories);
    
    // Update products with category IDs
    products[0].category = createdCategories[0]._id; // Fruits & Vegetables
    products[1].category = createdCategories[1]._id; // Dairy & Eggs

    // Add products
    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();