import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Login({
    onLogin,
    onRegister,
    authError,
    resetAuthError,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [authState, setAuthState] = useState("login");
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const error = await onLogin(email, password);
        if (!error) {
            navigate("/now-showing-movies");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const error = await onRegister(email, password);
        if (!error && !authError && email !== "" && password !== "") {
            setShowModal(true);
        }
    };

    return (
        <div className="login-container">
            <section className="login-section">
                <div className="form">
                    <div className="label">
                        <h1>
                            <Link to="/now-showing-movies">
                                Reel<span className="accent">Time</span>
                            </Link>{" "}
                            {authState === "login" ? "Login" : "Register"}
                        </h1>
                        <p>Welcome user! Please enter your details.</p>
                    </div>
                </div>
                {authState === "login" ? (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {authError && (
                            <p style={{ fontStyle: "italic" }}>{authError}</p>
                        )}
                        <button type="submit">Log In</button>
                        <p>
                            Don't have an account?{" "}
                            <span
                                onClick={() => {
                                    setAuthState("register");
                                    resetAuthError();
                                }}
                            >
                                Register for free!
                            </span>
                        </p>
                    </form>
                ) : (
                    authState === "register" && (
                        <form onSubmit={handleRegister}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value.trim())
                                }
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {authError && (
                                <p style={{ fontStyle: "italic" }}>
                                    {authError}
                                </p>
                            )}
                            <button type="submit">Register</button>
                            <p>
                                Already have an account?{" "}
                                <span
                                    onClick={() => {
                                        setAuthState("login");
                                        resetAuthError();
                                    }}
                                >
                                    Login now!
                                </span>
                            </p>
                        </form>
                    )
                )}
                {showModal && (
                    <Modal
                        action="Done"
                        onSubmit={() => {
                            setAuthState("login");
                            setEmail("");
                            setPassword("");
                        }}
                        closeModal={() => setShowModal(false)}
                        headingMsg={"Confirm Your Email"}
                        subHeadingMsg={
                            "Check your email inbox and click the confirm button"
                        }
                    />
                )}
            </section>
        </div>
    );
}
