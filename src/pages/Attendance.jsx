import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";

export default function Attendance() {
  const { event } = useContext(EventContext);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const predict = () => {
    setLoading(true);
    setTimeout(() => {
      const fake = Math.floor(Math.random() * 300) + 100;
      setPrediction(fake);
      setLoading(false);
    }, 2000);
  };

  if (!event) return <div className="page"><h2>No Event Created</h2></div>;

  return (
    <div className="page">
      <h2>Attendance Prediction</h2>
      <p>Event: {event.name}</p>

      <button onClick={predict}>Run AI Prediction</button>

      {loading && <div className="ai-loader">AI Processing...</div>}
      {prediction && <h3>Predicted Attendance: {prediction} students</h3>}
    </div>
  );
}
