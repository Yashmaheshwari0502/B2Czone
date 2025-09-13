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
    name: 'Sanitary & Plumbing',
    description: 'Toilets, basins, faucets and sanitary fittings',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Electrical & Wiring',
    description: 'Switches, wires, lights and electrical components',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Hardware & Tools',
    description: 'Door handles, locks, screws and hardware items',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Tiles & Flooring',
    description: 'Ceramic, marble and vitrified tiles',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Kitchen & Appliances',
    description: 'Kitchen sinks, cabinets and modular solutions',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Cement & Construction',
    description: 'Cement, sand, bricks and building materials',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Pipes & Fittings',
    description: 'PVC, CPVC pipes and plumbing fittings',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Paints & Adhesives',
    description: 'Wall paints, primers and construction adhesives',
    image: 'https://via.placeholder.com/150'
  }
];

const products = [
  // Sanitary & Plumbing
  {
    name: 'Wall Mounted Basin',
    description: 'Premium ceramic wall mounted wash basin',
    price: 2500,
    originalPrice: 3200,
    image: 'https://via.placeholder.com/300',
    category: null, // Will be set after categories are created
    stock: 25,
    unit: '1 piece',
    brand: 'Hindware'
  },
  {
    name: 'Single Lever Faucet',
    description: 'Chrome plated single lever basin mixer',
    price: 1800,
    originalPrice: 2300,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 40,
    unit: '1 piece',
    brand: 'Jaquar'
  },
  {
    name: 'Floor Mounted Toilet',
    description: 'One piece ceramic floor mounted WC',
    price: 8500,
    originalPrice: 11000,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 15,
    unit: '1 piece',
    brand: 'Kohler'
  },

  // Electrical & Wiring
  {
    name: '16A Power Socket',
    description: '16 Amp 3 pin power socket with safety shutter',
    price: 280,
    originalPrice: 350,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 100,
    unit: '1 piece',
    brand: 'Legrand'
  },
  {
    name: 'LED Ceiling Light',
    description: '18W round LED ceiling light, cool white',
    price: 650,
    originalPrice: 850,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 60,
    unit: '1 piece',
    brand: 'Philips'
  },
  {
    name: 'House Wire 2.5sqmm',
    description: 'Copper house wire 2.5 sq mm, 90 meter coil',
    price: 1200,
    originalPrice: 1450,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 80,
    unit: '90m coil',
    brand: 'Havells'
  },

  // Hardware & Tools
  {
    name: 'Mortise Lock',
    description: 'Heavy duty mortise lock with 3 keys',
    price: 450,
    originalPrice: 600,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 35,
    unit: '1 set',
    brand: 'Godrej'
  },
  {
    name: 'Door Handle Set',
    description: 'Stainless steel lever door handle with lock',
    price: 890,
    originalPrice: 1200,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 45,
    unit: '1 set',
    brand: 'Yale'
  },

  // Tiles & Flooring
  {
    name: 'Vitrified Floor Tiles',
    description: '2x2 feet vitrified tiles, glossy finish',
    price: 45,
    originalPrice: 55,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 500,
    unit: 'per sq ft',
    brand: 'Kajaria'
  },
  {
    name: 'Ceramic Wall Tiles',
    description: '12x18 inch ceramic wall tiles, white',
    price: 35,
    originalPrice: 45,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 800,
    unit: 'per sq ft',
    brand: 'Somany'
  },

  // Kitchen & Appliances
  {
    name: 'Stainless Steel Sink',
    description: 'Single bowl stainless steel kitchen sink',
    price: 3200,
    originalPrice: 4000,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 20,
    unit: '1 piece',
    brand: 'Nirali'
  },
  {
    name: 'Modular Kitchen Cabinet',
    description: 'Wall mounted kitchen cabinet with soft close',
    price: 5500,
    originalPrice: 7200,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 12,
    unit: '1 piece',
    brand: 'Godrej Interio'
  },

  // Cement & Construction
  {
    name: 'OPC 53 Grade Cement',
    description: 'Ordinary Portland Cement, 50kg bag',
    price: 380,
    originalPrice: 420,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 200,
    unit: '50kg bag',
    brand: 'UltraTech'
  },
  {
    name: 'Red Clay Bricks',
    description: 'Standard size red clay building bricks',
    price: 8,
    originalPrice: 10,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 5000,
    unit: 'per piece',
    brand: 'Local Kiln'
  },

  // Pipes & Fittings
  {
    name: 'PVC Pipe 4 inch',
    description: '4 inch PVC drainage pipe, 6 meter length',
    price: 320,
    originalPrice: 380,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 150,
    unit: '6m length',
    brand: 'Supreme'
  },
  {
    name: 'CPVC Pipe 1/2 inch',
    description: '1/2 inch CPVC hot water pipe, 3 meter',
    price: 85,
    originalPrice: 105,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 300,
    unit: '3m length',
    brand: 'Astral'
  },
  {
    name: 'Pipe Elbow 90 Degree',
    description: '1/2 inch PVC elbow fitting, 90 degree',
    price: 15,
    originalPrice: 20,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 1000,
    unit: '1 piece',
    brand: 'Finolex'
  },

  // Paints & Adhesives
  {
    name: 'Exterior Wall Paint',
    description: 'Weather resistant exterior emulsion paint',
    price: 850,
    originalPrice: 1100,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 40,
    unit: '4L can',
    brand: 'Asian Paints'
  },
  {
    name: 'Tile Adhesive',
    description: 'High strength ceramic tile adhesive',
    price: 280,
    originalPrice: 350,
    image: 'https://via.placeholder.com/300',
    category: null,
    stock: 75,
    unit: '20kg bag',
    brand: 'Pidilite'
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