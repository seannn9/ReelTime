import "../styles/Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    return (
        <section className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-msg">
                    <h1 className="hero-title">
                        <span className="accent">The Perfect Seat.</span>
                        <span className="secondary">Just A Click Away</span>
                    </h1>
                    <p className="hero-subtitle">
                        Skip the lines and reserve your seat online. <br />{" "}
                        Enjoy your movie, stress-free!
                    </p>
                </div>
                <div className="cta-container">
                    <button
                        className="welcome-btn primary"
                        onClick={() => navigate("/now-showing-movies")}
                    >
                        Get Started
                    </button>
                    <button
                        className="welcome-btn secondary"
                        onClick={() => navigate("/")}
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}
