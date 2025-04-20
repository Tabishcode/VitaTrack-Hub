import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavbarMain from "./components/NavbarMain.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import FoodDashboard from "./pages/FoodDashboard.jsx";
import FoodTimeTable from "./pages/FoodTimeTable.jsx";
import FitnessDashboard from "./pages/FitnessDashboard.jsx";
import Welcome from "./components/WelcomeFoodFitness.jsx";
import FoodForm from "./components/CaloriesRequirmentForm.jsx";
import Reports from "./pages/Reports.jsx"
import Blogs from "./pages/Blogs.jsx"
import Footer from "./components/Footer.jsx";
import NotFound from "./components/NotFound.jsx";
import SignUp from "./components/signup.jsx";
import useAuth from "./hooks/useAuth.jsx";
import "./style.css";
import "./index.css";
import PuffLoader from "react-spinners/PuffLoader";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";

const App = () => {
  const { isLoggedIn, user, revalidate } = useAuth();
  const [isFormFilled, setIsFormFilled] = useState(false); // Manage loading state for form status

    useEffect(() => {
        const checkFormStatus = async () => {
            try {
                const response = await fetch("/api/user/checkDetails");
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
        {isLoggedIn && user?.isAdmin ? (
          <AdminNavbar user={user} revalidate={revalidate} />
        ) : (
          <NavbarMain
            isLoggedIn={isLoggedIn}
            user={user}
            revalidate={revalidate}
          />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={revalidate} />} />
          <Route path="/signup" element={<SignUp onSignUp={revalidate} />} />
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminDashboard /> : <NotFound />}
          />
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
          <Route
            path="/FoodDashBoard"
            element={isLoggedIn ? <FoodDashboard /> : <NotFound />}
          />
          <Route
            path="/FoodTimeTable"
            element={isLoggedIn ? <FoodTimeTable /> : <NotFound />}
          />
          <Route
            path="/fitness"
            element={isLoggedIn ? <FitnessDashboard /> : <NotFound />}
          />
          <Route
            path="/reports"
            element={isLoggedIn ? <Reports /> : <NotFound />}
          />
          <Route
            path="/blogs"
            element={isLoggedIn ? <Blogs /> : <NotFound />}
          />
        </Routes>
        <Footer />
      </Router>
    );
};

export default App;
