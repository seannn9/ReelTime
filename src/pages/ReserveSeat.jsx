import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../server/supabase-client";

export default function ReserveSeat() {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const { data, error } = await supabase
                .from("Movies")
                .select("*")
                .eq("movie_id", movie_id);

            if (error) {
                console.log(
                    "An error occured while fetching movie data: ",
                    error
                );
            } else if (data.length === 0) {
                console.log("No Movie Found");
            } else {
                setMovie(data[0]);
            }
        };

        fetchMovie().catch(console.error);
    }, [movie_id]);

    return (
        <>
            <div>{movie ? movie.title : "Loading..."}</div>
            {movie.length === 0 && "No Movie Found matching this ID"}
        </>
    );
}
