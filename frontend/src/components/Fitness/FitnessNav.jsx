import React from "react";

const ExpensesNav = ({ setActiveComponent }) => {
    const handleNavigation = (componentName) => {
        setActiveComponent(componentName);
    };

    return (
        <nav className="bg-slate-50 text-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold cursor-pointer">Fitness Manager</div>

                {/* Navigation Links */}
                <div className="flex space-x-8">
                    <a
                        onClick={() => handleNavigation("FitnessHome")}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        Home
                    </a>
                    <a
                        onClick={() => handleNavigation("FitnessCalories")}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        Calories
                    </a>
                    <a
                        onClick={() => handleNavigation("FitnessDiary")}
                        className="cursor-pointer caret-red-700 hover:text-gray-400"
                    >
                        Diary
                    </a>
                    {/* <a
                        onClick={() => handleNavigation("FitnessGoal")}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        Set Goal
                    </a> */}
                    <a
                        onClick={() => handleNavigation("FitnessArticles")}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        Articles
                    </a>
                    <a
                        onClick={() => handleNavigation("FitnessSuggestions")}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        Suggestions
                    </a>
                </div>

                {/* Right-side Button */}
                <div style={{marginLeft: '20px', width: '20px'}}>
                    {/* <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setActiveComponent("ExpenseForm")}
                    >
                        Add Expense
                    </button> */}
                </div>
            </div>
        </nav>
    );
};

export default ExpensesNav;
