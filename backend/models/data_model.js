const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "salary",
      "education",
      "project",
      "food",
      "bills",
      "medical",
      "fee",
      "tax",
      "other",
    ],
  },
  description: {
    type: String,
    maxlength: 500, // Optional: Limit description length
  },
  expenseType: {
    type: String,
    required: true,
    enum: ["expense", "income"], // Ensure it’s either 'expense' or 'income'
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create and export the model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
