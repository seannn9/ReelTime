import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../server/supabase-client";
import "../styles/ReserveSeat.css";

export default function ReserveSeat() {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState([]);
    const [showingDates, setShowingDates] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState("Select Theater");
    const [selectedDate, setSelectedDate] = useState("Select Date");
    const [selectedTime, setSelectedTime] = useState("Select Time");
    const [selectedSeats, setSelectedSeats] = useState("Select Seats");
    const [reservedSeats, setReservedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

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
                calculateShowingDates(data[0].showing_until);
            }
        };

        fetchMovie().catch(console.error);
    }, [movie_id]);

    const calculateShowingDates = (showing_until) => {
        const dates = [];
        const currentDate = new Date();
        const endDate = new Date(showing_until);

        endDate.setDate(endDate.getDate() + 1); // include the last date

        while (currentDate < endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setShowingDates(dates);
    };

    const handleSeatClick = (seat_id) => {};

    const proceedToPayment = () => {};

    return (
        <section className="movie-details-section">
            {showingDates.length !== 0 ? (
                <div className="theater-details">
                    <div className="theater-list-container">
                        <h2>Theater</h2>
                        <div className="theater-list">
                            {movie.theater_showing?.map((theater, key) => (
                                <h4 className="theater" key={key}>
                                    {theater}
                                </h4>
                            ))}
                        </div>
                        <div className="date-list-container">
                            <h2>Date</h2>
                            <div className="date-list">
                                {showingDates.map((date, key) => (
                                    <h4 className="date" key={key}>
                                        {date.toLocaleString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </h4>
                                ))}
                            </div>
                        </div>
                        <div className="time-list-container">
                            {/* Hard coded values for now *TENTATIVE */}
                            <h2>Time</h2>
                            <div className="time-list">
                                <h4>10:30 AM</h4>
                                <h4>12:00 PM</h4>
                                <h4>1:30 PM</h4>
                                <h4>3:00 PM</h4>
                                <h4>4:30 PM</h4>
                                <h4>6:00 PM</h4>
                            </div>
                        </div>
                    </div>
                    <div className="seat-layout">
                        <div className="screen">SCREEN</div>
                        <div className="seats-container">
                            {["A", "B", "C", "D", "E"].map((row) => (
                                <div key={row} className="seat-row">
                                    <div className="row-label">{row}</div>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (seat) => {
                                            const seat_id = `${row}${seat}`;
                                            const isReserved =
                                                reservedSeats.includes(seat_id);
                                            return (
                                                <div
                                                    key={seat_id}
                                                    className={`seat ${
                                                        selectedSeats.includes(
                                                            seat_id
                                                        )
                                                            ? "selected"
                                                            : isReserved
                                                            ? "reserved"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        !isReserved &&
                                                        handleSeatClick(seat_id)
                                                    }
                                                    style={{
                                                        cursor: isReserved
                                                            ? "not-allowed"
                                                            : "pointer",
                                                    }}
                                                >
                                                    {seat}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="seat-legend">
                            <div className="legend-item">
                                <div className="legend-seat legend-available"></div>
                                <span>Available</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat legend-selected"></div>
                                <span>Selected</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat legend-reserved"></div>
                                <span>Reserved</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="theater-details"
                    style={{ justifyContent: "center", fontSize: "1.5rem" }}
                >
                    <h2>This Movie Is Not Showing Anymore</h2>
                </div>
            )}
            <div className="order-details">
                <div
                    className="movie-details-content"
                    style={{
                        marginBottom: showingDates.length === 0 ? "0" : "",
                    }}
                >
                    <div className="movie-poster">
                        <img src={movie.poster_path} alt={movie.title} />
                    </div>
                    <div className="details">
                        <h1>{movie.title}</h1>
                        <div className="info">
                            <p>
                                <span className="bold">Duration:</span>{" "}
                                {movie.duration}
                            </p>
                            <p>
                                <span className="bold">Genre:</span>{" "}
                                {movie.genre}
                            </p>
                            <p
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>
                                    <span className="bold">Release:</span>{" "}
                                    {movie.release_date}
                                </span>
                                <span>
                                    <span className="bold">Ticket Price:</span>{" "}
                                    ₱{movie.price}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {showingDates.length !== 0 && (
                    <div className="order-confirmation">
                        <h2>{selectedTheater}</h2>

                        <h3>{selectedDate}</h3>
                        <p>{selectedTime}</p>
                        <p>
                            {typeof selectedSeats == "string"
                                ? selectedSeats
                                : selectedSeats.join(", ")}
                        </p>
                        <p style={{ textAlign: "right", fontWeight: "bold" }}>
                            TOTAL PRICE: ₱{totalPrice}
                        </p>
                        <button
                            onClick={proceedToPayment}
                            disabled={isDisabled}
                            className={isDisabled ? "disabled" : ""}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
