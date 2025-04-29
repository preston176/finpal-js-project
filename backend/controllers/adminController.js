const Income = require("../models/Income");
const Expense = require("../models/Expense");

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
