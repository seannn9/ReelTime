import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ReserveSeat from "./pages/ReserveSeat";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import supabase from "./server/supabase-client";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    const [authError, setAuthError] = useState(null);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (error && error.message !== "Auth session missing!") {
                setAuthError(error.message);
            } else {
                setUsername(user.email);
                setIsLoggedIn(true);
            }
        };

        getUser();
    }, []);

    const handleLogin = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error && error.message !== "Auth session missing!") {
            setAuthError(error.message);
            return error.message;
        } else {
            setUsername(data.user.email);
            setIsLoggedIn(true);
            return null;
        }
    };

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();

        if (error) {
            setAuthError(error.message);
        } else {
            setIsLoggedIn(false);
            setUsername("");
            setAuthError("");
            navigate("/login");
        }
    };
    return (
        <div className="container">
            <Navbar
                username={username}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute
                            isLoggedIn={isLoggedIn}
                            redirectTo="/now-showing-movies"
                        >
                            <Login
                                username={username}
                                onLogin={handleLogin}
                                authError={authError}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route path="/now-showing-movies" element={<Home />} />
                <Route
                    path="/selected-movie"
                    element={<Navigate to="/now-showing-movies" />}
                />
                <Route
                    path="/selected-movie/:movie_id"
                    element={<ReserveSeat />}
                />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}
