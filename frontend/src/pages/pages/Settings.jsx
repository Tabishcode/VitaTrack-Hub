import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = ({ categories, setCategories, categoryTotals }) => {
  const [budgetLimits, setBudgetLimits] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  // Fetch budget data when the component mounts
  useEffect(() => {
    const savedBudget = localStorage.getItem('budgetLimits');
    if (savedBudget) {
      // setBudgetLimits(JSON.parse(savedBudget));
      // setInputValues(JSON.parse(savedBudget));
    } else {
      fetchBudget();
    }
    console.log("Category Totals:", categoryTotals);
  }, [categories]); // Depend on categories to fetch new budget data dynamically

  const fetchBudget = async () => {
    try {
      const response = await fetch('/api/expenses/budget');
      // console.log("response",response);
      if (response.ok) {
        const budgetData = await response.json();

        setBudgetLimits(budgetData.budget);
        setInputValues(budgetData.budget);
        localStorage.setItem('budgetLimits', JSON.stringify(budgetData.budget));
      } else {
        console.log('No saved budget found');
      }
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value < 0) {
      alert("Budget limit cannot be negative!");
      return;
    }

    if (isNaN(value)) {
      alert("Please enter a valid number for the budget.");
      return;
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    if (categories.includes(newCategory)) {
      alert("This category already exists.");
      return;
    }

    setCategories([...categories, newCategory]);
    setBudgetLimits((prevLimits) => ({
      ...prevLimits,
      [newCategory]: 0,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      [newCategory]: 0,
    }));
    setNewCategory("");
    localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      const response = await fetch(`/api/expenses/budget`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryToDelete }),
      });

      if (response.ok) {
        const updatedBudgetLimits = { ...budgetLimits };
        delete updatedBudgetLimits[categoryToDelete];
        setBudgetLimits(updatedBudgetLimits);
        setInputValues(updatedBudgetLimits);
        setCategories(categories.filter((category) => category !== categoryToDelete));
        localStorage.setItem('budgetLimits', JSON.stringify(updatedBudgetLimits));
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error occurred while deleting category');
    }
  };

  const handleReset = () => {
    setInputValues(budgetLimits);
  };

  const handleSave = async () => {
    const invalidValue = Object.values(inputValues).some((value) => value < 0);

    if (invalidValue) {
      alert("Please ensure all budget limits are positive values.");
      return;
    }

    try {
      const response = await fetch('/api/expenses/budget', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget: inputValues }),
      });

      if (response.ok) {
        const savedData = await response.json();
        console.log('Budget saved:', savedData);
        alert('Budget limits saved successfully!');
        setBudgetLimits(inputValues);
        localStorage.setItem('budgetLimits', JSON.stringify(inputValues));
      } else {
        alert('Failed to save budget limits');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('Error occurred while saving budget');
    }
  };

  // Compare category total sum with budget total sum
  useEffect(() => {
    const totalCategorySum = categories.reduce((sum, category) => {
      // console.log(`Checking category: ${category}`);
      const categoryTotal = categoryTotals[category];
      // console.log(`Category total: ${categoryTotal}`);
      return sum + (categoryTotal || 0);
    }, 0);

    const totalBudgetSum = Object.values(budgetLimits).reduce((sum, budget) => sum + parseFloat(budget), 0);
    // console.log("the total sum of categorysum is", totalCategorySum, "and the total sum of total budget sum", totalBudgetSum);

    if (totalCategorySum > totalBudgetSum) {
      setWarningMessage("Your budget is across.");
    } else {
      setWarningMessage("");
    }
  }, [categoryTotals, budgetLimits]);

  return (
    <div className="settings-page container mt-4">
      <h1 className="text-center mb-4">Budget Limits</h1>

      {/* Display Current Budget Limits */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-4">Current Budget Limits</h4>
          <ul className="list-group">
            {budgetLimits && Object.keys(budgetLimits).map((category) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={category}
              >
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
                <span>${budgetLimits[category]}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteCategory(category)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Add New Category */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-4">Add New Category</h4>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Budget Limits Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-4">Set Budget Limits for Categories</h4>

          <form>
            {categories.map((category) => (
              <div className="mb-3" key={category}>
                <label htmlFor={category} className="form-label">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Budget
                </label>
                <input
                  type="number"
                  className="form-control"
                  id={category}
                  name={category}
                  value={inputValues[category]}
                  onChange={handleChange}
                  placeholder={`Enter budget for ${category}`}
                />
              </div>
            ))}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSave}
              >
                Save Budget Limits
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleReset}
              >
                Reset Input Fields
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* Category Totals */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-4">Category Totals</h4>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={category}
              >
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)} Total:</strong>
                <span>${categoryTotals[category]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div>
        # Displaying Warning Message
        {warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
      </div> */}
    </div>
  );
};

export default Settings;
