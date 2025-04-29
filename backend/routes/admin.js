const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Optional: Add middleware to verify admin role
// const { verifyAdmin } = require("../middleware/auth");

router.get("/transactions", /* verifyAdmin, */ adminController.getAllTransactions);

router.get("/users", adminController.getAllUsers)

router.delete("/users/:id", adminController.deleteUser);
router.patch("/users/:id/disable", adminController.toggleDisableUser);
router.patch("/users/:id/enable", adminController.toggleEnableUser);

module.exports = router;