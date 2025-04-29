const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Users = require("../models/User")

// Get all transactions for admin
exports.getAllTransactions = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ date: -1 });
        const expenses = await Expense.find().sort({ date: -1 });

        const combined = [
            ...incomes.map(t => ({ ...t.toObject(), type: "Income" })),
            ...expenses.map(t => ({ ...t.toObject(), type: "Expense" })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(combined);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Get all users

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();

        if (users.length == 0) {
            res.status(404).json({ message: "Users not found" });
            return
        }
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


// DELETE a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully", id });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// TOGGLE user.disabled
exports.toggleDisableUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { disabled } = req.body;

        const user = await Users.findByIdAndUpdate(
            id,
            { disabled },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `User ${disabled ? "disabled" : "enabled"} successfully`, user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
// TOGGLE user.enabled
exports.toggleEnableUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { disabled } = req.body;

        const user = await Users.findByIdAndUpdate(
            id,
            { disabled },
            { new: false }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `User ${disabled ? "disabled" : "enabled"} successfully`, user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
