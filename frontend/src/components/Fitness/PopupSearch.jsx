import React, { useState, useEffect } from "react";

const PopupSearch = ({ onClose, type, onAdd }) => {
    const [query, setQuery] = useState(""); // Search query
    const [filteredItems, setFilteredItems] = useState([]); // Filtered items
    let [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // Currently selected item

    // setItems(["Apple", "Banana", "Orange", "Grape", "Mango", "Pineapple"]);

    useEffect(() => {
        async function fetchExercises() {
            let data = await fetch('api/exercise/data?type=' + type);
            data = await data.json();
            let names = data.map(el => el.name);
            // console.log(names);
            setItems(names);
        }
        fetchExercises();
    }, []);

    // Handle search input
    const handleSearch = (event) => {
        setSelectedItem(null);
        const value = event.target.value;
        setQuery(value);
        if (value.length >= 1) {
            // Filter items
            const filtered = items.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
        else {
            setFilteredItems([]);
        }
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const handleAdditon = (item) => {
        // alert(`The Exercise ${item} has been added to the list.`);
        onAdd(item);
        onClose();
    }

    return (
        <div>
            {(
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "1000",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "400px",
                            textAlign: "center",
                        }}
                    >
                        <h3>Search Items</h3>
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search..."
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "15px",
                                boxSizing: "border-box",
                            }}
                        />
                        <ul style={{ maxHeight: "150px", overflowY: "auto", padding: "0", listStyle: "none" }}>
                            {/* {(filteredItems.length > 0 ? filteredItems : items).map((item, index) => ( */}
                            {filteredItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)} // Handle click to select item
                                    style={{
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #ddd",
                                        backgroundColor: selectedItem === item ? "#007BFF" : "transparent", // Highlight selected item
                                        color: selectedItem === item ? "white" : "black",
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={selectedItem ? () => handleAdditon(selectedItem) : onClose} // Handle Add or Close
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                backgroundColor: selectedItem ? "#28a745" : "#007BFF", // Change button color
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginLeft: "10px",
                            }}
                        >
                            {selectedItem ? "Add" : "OK"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopupSearch;
