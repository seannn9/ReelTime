import supabase from "../server/supabase-client.js";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Home.css";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const { data, error } = await supabase.from("Movies").select("*");

        if (error) {
            console.log("An error occured while fetching movies: ", error);
        } else {
            setMovies(data);
        }
    };

    return (
        <section className="dashboard-section">
            <h1>
                Now <span className="accent">Showing</span>
            </h1>
            <div className="movies">
                {movies &&
                    movies.map((movie, key) => (
                        <MovieCard
                            key={key}
                            movie_id={movie.movie_id}
                            poster={movie.poster_path}
                            title={movie.title}
                        />
                    ))}
            </div>
        </section>
    );
}
