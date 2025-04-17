import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavbarMain from "./components/NavbarMain.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
// import FoodDashboard from "./pages/FoodDashboard.jsx";
// import FitnessDashboard from "./pages/FitnessDashboard.jsx";
import PasswordDashboard from "./pages/PasswordDashboard.jsx";
// import Welcome from "./components/WelcomeFoodFitness.jsx";
// import FoodForm from "./components/CaloriesRequirmentForm.jsx";
import Footer from "./components/Footer.jsx";
// import Expenses from "./pages/Expenses.jsx";
import NotFound from "./components/NotFound.jsx";
import SignUp from "./components/signup.jsx";
import useAuth from "./hooks/useAuth.jsx";
import "./style.css";
import "./index.css";
import PuffLoader from "react-spinners/PuffLoader";

const App = () => {
    const { isLoggedIn: realLogedIn, user, revalidate } = useAuth();
    const [isFormFilled, setIsFormFilled] = useState(false); // Manage loading state for form status
    const isLoggedIn = true 
    const user 
    useEffect(() => {
        const checkFormStatus = async () => {
            try {
                const response = await fetch("https://vitalhub-mvp-production.up.railway.app/api/user/checkDetails");
                const data = await response.json();
                setIsFormFilled(data.details ? true : false);
            } catch (error) {
                console.error("Error:", error);
                setIsFormFilled(false);
            }
        };

        if (isLoggedIn) {
            checkFormStatus();
        }
    }, [isLoggedIn]);

    if (isFormFilled === null) {
        // Render a loading screen or spinner while checking form status
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent
                    zIndex: 9999, // Ensures it's above other content
                }}
            >
                <PuffLoader
                    size={150}
                    color="#0a31f7"
                />
            </div>
        );
    }


    return (
        <Router>
            <NavbarMain isLoggedIn={isLoggedIn} user={user} revalidate={revalidate} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={revalidate} />} />
                <Route path="/signup" element={<SignUp onSignUp={revalidate} />} />
                <Route
                    path="/welcome"
                    element={
                        isLoggedIn ? (
                            isFormFilled ? (
                                <Navigate to="/FoodDashboard" />
                            ) : (
                                <Welcome />
                            )
                        ) : (
                            <NotFound />
                        )
                    }
                />
                <Route
                    path="/FoodForm"
                    element={
                        isLoggedIn ? (
                            isFormFilled ? (
                                <Navigate to="/FoodDashboard" />
                            ) : (
                                <FoodForm />
                            )
                        ) : (
                            <NotFound />
                        )
                    }
                />
                <Route path="/FoodDashBoard" element={isLoggedIn ? <FoodDashboard /> : <NotFound />} />
                <Route path="/fitness" element={isLoggedIn ? <FitnessDashboard /> : <NotFound />} />
                <Route path="/ExpensesDashboard" element={isLoggedIn ? <Expenses /> : <NotFound />} />
                <Route path="/passwords" element={isLoggedIn ? <PasswordDashboard /> : <NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
