import React from "react";

const FitnessSuggestions = ({ suggestion }) => {
    return (
        <div className="max-w-md mx-auto mt-6 p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <img
                        src={suggestion.icon}
                        alt={suggestion.title}
                        className="w-8 h-8"
                    />
                </div>
                <h2 className="ml-4 text-lg font-semibold text-gray-800">
                    {suggestion.title}
                </h2>
            </div>
            <p className="text-gray-600 mb-4">{suggestion.description}</p>
            <a href={`https://www.google.com/search?q=${suggestion.title}`} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    Learn More
                </button>
            </a>
        </div>
    );
};

const suggestions = [
    {
        id: 1,
        title: "Stay Hydrated",
        description: "Drink at least 8 glasses of water today to stay healthy.",
        icon: '/icons/water-drop.png'
    },
    {
        id: 2,
        title: "Go for a Walk",
        description: "Take a 30-minute walk to boost your energy and mood.",
        icon: '/icons/walk.png'
    },
];

const App = () => {
    return (
        <div className="bg-gray-100  py-10">
            <h1 className="text-2xl font-bold text-center text-gray-800">
                Your Fitness Suggestions
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-4">
                {suggestions.map((suggestion) => (
                    <FitnessSuggestions key={suggestion.id} suggestion={suggestion} />
                ))}
            </div>
        </div>
    );
};

export default App;
