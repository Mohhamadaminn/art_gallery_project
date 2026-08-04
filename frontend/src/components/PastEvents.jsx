import { useEffect, useState } from "react";
import { getPastEvents } from "../api/gallery";

export default function PastEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await getPastEvents();
                setEvents(data);
            } catch (error) {
                console.error("Failed to load past events:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);


    if (loading) {
        return <p>Loading events...</p>;
    }


    return (
        <section className="py-5">
            <div className="container">

                <h2 className="mb-4">
                    Past Events
                </h2>


                <div className="row g-4">

                    {events.map((event) => (
                        <div
                            className="col-md-4"
                            key={event.id}
                        >

                            <div className="card h-100 shadow-sm">

                                <img
                                    src={event.image}
                                    alt={event.caption}
                                    className="card-img-top"
                                    style={{
                                        height: "250px",
                                        objectFit: "cover"
                                    }}
                                />


                                <div className="card-body">

                                    <p className="card-text">
                                        {event.caption}
                                    </p>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}