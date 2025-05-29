import { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
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
                            Login
                        </h1>
                        <p>Welcome user! Please enter your details.</p>
                    </div>
                </div>
                <form>
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
                    <button type="submit" onClick={register}>
                        Log In
                    </button>
                    <p>
                        Don't have an account?{" "}
                        <span className="accent">Register for free!</span>
                    </p>
                </form>
            </section>
        </div>
    );
}
