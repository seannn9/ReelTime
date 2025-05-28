import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <h1 style={{ fontSize: "4rem" }}>404</h1>
            <h2>
                <span className="accent">OOPS!</span> Page Not Found
            </h2>
            <button
                className="welcome-btn primary"
                onClick={() => navigate("/now-showing-movies")}
                style={{ margin: "2em" }}
            >
                Back to Home
            </button>
        </div>
    );
}
