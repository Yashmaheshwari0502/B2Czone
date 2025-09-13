const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder).put(protect, admin, updateOrder);

module.exports = router;