import supabase from "../server/supabase-client.js";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Home.css";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.from("Movies").select("*");

            if (error) {
                console.log("An error occured while fetching movies: ", error);
            } else {
                setMovies(data);
            }
        } catch (error) {
            console.log("Error fetching movies: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="dashboard-section">
            <h1>
                Now <span className="accent">Showing</span>
            </h1>
            <div className="movies">
                {isLoading ? (
                    [...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="loading-skeleton"
                            style={{
                                height: "375px",
                                width: "250px",
                            }}
                        />
                    ))
                ) : movies.length > 0 ? (
                    movies.map((movie, key) => (
                        <MovieCard
                            key={key}
                            movie_id={movie.movie_id}
                            poster={movie.poster_path}
                            title={movie.title}
                        />
                    ))
                ) : (
                    <div
                        style={{
                            gridColumn: "1/-1",
                            textAlign: "center",
                            padding: "2rem",
                        }}
                    >
                        No movies currently showing
                    </div>
                )}
            </div>
        </section>
    );
}
