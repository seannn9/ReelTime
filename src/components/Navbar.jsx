import { Link } from "react-router-dom";
import logo from "../assets/favicon32.png";
import "../styles/components/Navbar.css";

export default function Navbar() {
    return (
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
            <div className="nav-links"></div>
        </nav>
    );
}
