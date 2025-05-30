import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/favicon32.png";
import "../styles/components/Navbar.css";
import Modal from "./Modal";
import { useState } from "react";

export default function Navbar({ username, isLoggedIn, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                        <h1>
                            Reel
                            <span className="accent">Time</span>
                        </h1>
                    </Link>
                </div>
                <div className="nav-links">
                    {isLoggedIn ? (
                        <div className="auth-links">
                            <p>{username}</p>
                            <p
                                onClick={() => setShowModal(true)}
                                className="auth-btn"
                            >
                                Logout
                            </p>
                        </div>
                    ) : (
                        pathname !== "/login" && (
                            <div className="auth-links">
                                <p
                                    onClick={() => navigate("/login")}
                                    className="auth-btn"
                                >
                                    Login
                                </p>
                            </div>
                        )
                    )}
                </div>
            </nav>
            {showModal && (
                <Modal
                    action={"Log Out"}
                    onSubmit={onLogout}
                    closeModal={() => setShowModal(false)}
                    headingMsg={"Do you want to log out?"}
                    subHeadingMsg={"All your unsaved changes will be lost"}
                />
            )}
        </>
    );
}
