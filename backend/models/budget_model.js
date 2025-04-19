const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  budget: {
    type: Map,
    of: Number,
    required: true,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
