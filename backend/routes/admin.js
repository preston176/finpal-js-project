const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Optional: Add middleware to verify admin role
// const { verifyAdmin } = require("../middleware/auth");

router.get("/transactions", /* verifyAdmin, */ adminController.getAllTransactions);

module.exports = router;