import React, { useState } from "react";
import ExpenseFormModal from "../components/Expenses/ExpensesForm";
import FitnessNav from '../components/Fitness/FitnessNav'
import FitnessHome from '../components/Fitness/FitnessHome'
import FitnessDiary from '../components/Fitness/FitnessDiary'
import FitnessCalories from '../components/Fitness/FitnessCalories'
import FitnessGoal from '../components/Fitness/FitnessGoal'
import FitnessArticles from '../components/Fitness/FitnessArticles'
import FitnessSuggestions from '../components/Fitness/FitnessSuggestions'

import FoodDashboard from './FoodDashboard'

const ExpensesDashboard = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeComponent, setActiveComponent] = useState("FitnessHome"); // Track which component to show

    const handleCloseForm = () => {
        setIsFormVisible(false); // Hide the form
    };

    const handleFormSubmit = (expenseData) => {
        console.log("Expense Submitted:", expenseData);
        setIsFormVisible(false); // Hide the form on submit
    };

    // Function to switch components based on navbar clicks
    const renderComponent = () => {
        switch (activeComponent) {
            case "FitnessHome":
                return (
                    <FitnessHome onAddExpenseClick={() => setIsFormVisible(true)} />
                );
            case "FitnessCalories":
                return <FoodDashboard attendance={false} />; // Placeholder for the Reports component

            case "FitnessDiary":
                return <FitnessDiary />;
            case "FitnessGoal":
                return <FitnessGoal />; // Placeholder for the Advices component
            case "FitnessArticles":
                return <FitnessArticles />; // Placeholder for the Advices component
            case "FitnessSuggestions":
                return <FitnessSuggestions />; // Placeholder for the Advices component
            default:
                return (
                    <FitnessHome onAddExpenseClick={() => setIsFormVisible(true)} />
                ); // Default component
        }
    };

    return (
        <div>
            <FitnessNav setActiveComponent={setActiveComponent} />
            <div className="container mx-auto p-4">
                {renderComponent()}{" "}
                {/* Dynamically render the component below the navbar */}
            </div>
            <ExpenseFormModal
                isVisible={isFormVisible}
                onClose={handleCloseForm}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default ExpensesDashboard;
