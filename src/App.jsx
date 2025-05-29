import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ReserveSeat from "./pages/ReserveSeat";
import NotFound from "./pages/404";
import Login from "./pages/Login";

export default function App() {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
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
