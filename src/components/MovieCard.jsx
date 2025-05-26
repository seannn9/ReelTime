import { useNavigate } from "react-router-dom";
import "../styles/components/MovieCard.css";

export default function MovieCard(props) {
    const navigate = useNavigate();

    const navigateToSeatReserve = () => {
        navigate(`/selected-movie/${props.movie_id}`);
    };

    return (
        <div className="movie-card" onClick={navigateToSeatReserve}>
            <div className="movie-poster">
                <img src={props.poster} alt={props.title} />
            </div>
            <div className="movie-details">
                <h4>{props.title}</h4>
            </div>
        </div>
    );
}
