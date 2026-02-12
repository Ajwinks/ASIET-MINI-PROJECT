import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export default function Venue() {
  const { event } = useContext(EventContext);

  if (!event) return <div className="page"><h2>No Event Created</h2></div>;

  const venue = event.type.toLowerCase().includes("tech")
    ? "Main Auditorium"
    : "Seminar Hall B";

  return (
    <div className="page">
      <h2>Recommended Venue</h2>
      <h3>{venue}</h3>
    </div>
  );
}
