import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {

  /* ================= AI HERO TEXT ================= */

  const aiMessages = [
    "Predicting Attendance Using Historical Data...",
    "Optimizing Venue Allocation...",
    "Analyzing Feedback Sentiments...",
    "Allocating Volunteers by Skill Matrix..."
  ];

  const [aiText, setAiText] = useState(aiMessages[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % aiMessages.length;
      setAiText(aiMessages[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ================= DASHBOARD COUNTER ================= */

  const [count, setCount] = useState({
    events: 0,
    active: 0,
    upcoming: 0,
    completed: 0,
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => ({
        events: prev.events < 24 ? prev.events + 1 : 24,
        active: prev.active < 5 ? prev.active + 1 : 5,
        upcoming: prev.upcoming < 8 ? prev.upcoming + 1 : 8,
        completed: prev.completed < 11 ? prev.completed + 1 : 11,
      }));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  /* ================= ROTATING AI INSIGHT ================= */

  const insights = [
    "Venue capacity may exceed limit.",
    "23 attendees pending confirmation.",
    "Budget optimization suggestion available.",
    "High engagement expected based on trend."
  ];

  const [insight, setInsight] = useState(insights[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % insights.length;
      setInsight(insights[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ================= CARD 3D EFFECT ================= */

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * 8;
        const rotateY = (x / rect.width - 0.5) * -8;

        card.style.transform =
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
      });
    });
  }, []);

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>AI Smart Event Management System</h1>
        <p className="ai-text">{aiText}</p>
      </section>

      {/* ================= DASHBOARD ================= */}
      <section className="dashboard">
        <div className="dash-card">
          <h2>{count.events}</h2>
          <span>Total Events</span>
        </div>
        <div className="dash-card">
          <h2>{count.active}</h2>
          <span>Live Now</span>
        </div>
        <div className="dash-card">
          <h2>{count.upcoming}</h2>
          <span>Upcoming</span>
        </div>
        <div className="dash-card">
          <h2>{count.completed}</h2>
          <span>Completed</span>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">

  <Link to="/create" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M3 12h18M12 3v18" />
      </svg>
    </div>
    <h3>Create Event</h3>
    <p>Design and launch intelligent events.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/attendance" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M3 17l6-6 4 4 8-8" />
      </svg>
    </div>
    <h3>Attendance Prediction</h3>
    <p>AI-based turnout estimation.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/venue" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      </svg>
    </div>
    <h3>Venue Selection</h3>
    <p>Capacity-aware smart allocation.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/resources" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16v6H4zM4 14h10v6H4z" />
      </svg>
    </div>
    <h3>Resources</h3>
    <p>Equipment and asset management.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/volunteers" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM2 21a8 8 0 0116 0" />
      </svg>
    </div>
    <h3>Volunteers</h3>
    <p>Skill-based allocation system.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/feedback" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z" />
      </svg>
    </div>
    <h3>Feedback Analysis</h3>
    <p>Sentiment-driven insights.</p>
    <span className="card-arrow">→</span>
  </Link>

  <Link to="/participants" className="card">
    <div className="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87M7 7a4 4 0 118 0 4 4 0 01-8 0z" />
      </svg>
    </div>
    <h3>Past Participants</h3>
    <p>Track returning attendees.</p>
    <span className="card-arrow">→</span>
  </Link>

</section>


      {/* ================= AI INSIGHT ================= */}
      <section className="ai-insight">
        <h3>AI Insight</h3>
        <p>{insight}</p>
      </section>

    </div>
  );
}
