const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

router.route("/")
  .get(getCategories)
  .post(protect, admin, createCategory);

router.route("/:id")
  .get(getCategory)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;