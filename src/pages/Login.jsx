import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin, onRegister, authError }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [authState, setAuthState] = useState("login");

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
        if (!error) {
            setAuthState("login");
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            <span onClick={() => setAuthState("register")}>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Register</button>
                            <p>
                                Already have an account?{" "}
                                <span onClick={() => setAuthState("login")}>
                                    Login now!
                                </span>
                            </p>
                        </form>
                    )
                )}
            </section>
        </div>
    );
}
