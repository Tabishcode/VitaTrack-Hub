// server/index.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');

const Expense = require('../models/data_model'); 
const Budget = require('../models/budget_model'); 

// POST route to create a new expense
router.post('/data', async (req, res) => {
    const { amount, category, description, expenseType, date } = req.body;
    if (!amount || !category || !expenseType || !date) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const expense = new Expense({ amount, category, description, expenseType, date });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Error creating expense', error: err });
    }
});

// GET route to fetch all expenses
router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found' });
        }
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses', error: err });
    }
});

// GET route to fetch expenses by category
router.get('/expenses/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const expenses = await Expense.find({ category }); // Fetch expenses filtered by category
        if (expenses.length === 0) {
            return res.status(404).json({ message: `No expenses found in category: ${category}` });
        }
        res.status(200).json(expenses); // Return the filtered expenses
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses by category', error: err });
    }

});

// GET route to fetch expenses by expenseType (either 'income' or 'expense')
router.get('/expenses/type/:expenseType', async (req, res) => {
    const { expenseType } = req.params;

    try {
        const expenses = await Expense.find({ expenseType }); // Fetch expenses filtered by expenseType
        if (expenses.length === 0) {
            return res.status(404).json({ message: `No expenses found with type: ${expenseType}` });
        }
        res.status(200).json(expenses); // Return the filtered expenses
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses by type', error: err });
    }
});

// DELETE route to delete an expense by _id
router.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Received ID:', id);  // Log the ID to ensure it's correct
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        // Log the full error to understand what's causing the server error
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT route to update an expense by _id
router.put('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, category, description, expenseType, date } = req.body;

    // Validate if all required fields are provided
    if (!amount || !category || !expenseType || !date) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Update the expense by _id
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { amount, category, description, expenseType, date },
            { new: true }  // Return the updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Send the updated expense as the response
        res.status(200).json(updatedExpense);
    } catch (err) {
        res.status(500).json({ message: 'Error updating expense', error: err });
    }
});

//=====================================API REALTED OT BUDGET ======================================
//==================================================================================================
// Routes for Budget
router.post('/budget', async (req, res) => {
    try {
        const newBudget = new Budget({
            budget: req.body.budget
        });
        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.status(200).json(budgets);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PUT route to save/update budget limits
router.put('/budget', async (req, res) => {
    const { budget } = req.body; // Expecting a budget object in the request body

    if (!budget || typeof budget !== 'object') {
        return res.status(400).json({ message: 'Invalid budget data' });
    }

    try {
        // Update or create a budget entry in the database
        let budgetEntry = await Budget.findOneAndUpdate(
            {}, // Assuming only one budget entry is stored
            { budget },
            { new: true, upsert: true } // Upsert ensures creation if not found
        );

        res.status(200).json({ message: 'Budget limits updated successfully', budget: budgetEntry });
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Error updating budget', error: error.message });
    }
});

router.delete('/budget', async (req, res) => {
    const { category } = req.body; // Expecting the category name to delete

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid category data' });
    }

    try {
        // Update or create a budget entry in the database by removing the category
        let budgetEntry = await Budget.findOneAndUpdate(
            {}, // Assuming only one budget entry is stored
            { $unset: { [`budget.${category}`]: "" } }, // Remove the category from the budget object
            { new: true, upsert: true } // Upsert ensures creation if not found
        );

        res.status(200).json({ message: 'Category deleted successfully', budget: budgetEntry });
    } catch (error) {
        // console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
});

module.exports = router;