import { useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import { motion } from "framer-motion";
import { MapPin, Building2, Users, MapIcon, AlertCircle } from "lucide-react";
import "./venue.css";

export default function Venue() {
  const { event } = useContext(EventContext);

  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-venue");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < 8000) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(14,165,233,0.5)";
      ctx.strokeStyle = "rgba(14,165,233,0.25)";

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  if (!event)
    return (
      <motion.div className="venue-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <canvas className="particle-network-venue"></canvas>
        <div className="empty-state">
          <h2>No Event Created Yet</h2>
          <p>Create an event first to get venue recommendations</p>
        </div>
      </motion.div>
    );

  const venue =
    event.type.toLowerCase().includes("conference") || event.type.toLowerCase().includes("tech")
      ? "Main Auditorium"
      : event.type.toLowerCase().includes("cultural")
      ? "Grand Hall"
      : "Seminar Hall B";

  const capacity =
    venue === "Main Auditorium" ? 500 : venue === "Grand Hall" ? 300 : 150;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <motion.div className="venue-page" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-venue"></canvas>

      <motion.div className="venue-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <MapPin size={48} />
        </motion.div>
        <h1>Recommended Venue</h1>
        <p>Perfect location for your {event.type} event</p>
      </motion.div>

      <motion.div className="venue-content" variants={containerVariants}>
        <motion.div className="venue-card" variants={itemVariants} custom={1}>
          <div className="venue-header-info">
            <Building2 size={32} />
            <h2>{venue}</h2>
          </div>
          <div className="venue-details">
            <div className="detail-item">
              <Users size={20} />
              <div>
                <span className="label">Capacity</span>
                <span className="value">{capacity} people</span>
              </div>
            </div>
            <div className="detail-item">
              <MapIcon size={20} />
              <div>
                <span className="label">Location</span>
                <span className="value">Campus Main Campus</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="amenities-card" variants={itemVariants} custom={2}>
          <h3>Amenities</h3>
          <div className="amenities-grid">
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>WiFi</span>
            </motion.div>
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>Parking</span>
            </motion.div>
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>AC</span>
            </motion.div>
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>AV Equipment</span>
            </motion.div>
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>Catering</span>
            </motion.div>
            <motion.div className="amenity-badge" whileHover={{ scale: 1.05 }}>
              <span>Restrooms</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="recommendation-card" variants={itemVariants} custom={3}>
          <div className="recommendation-header">
            <AlertCircle size={24} />
            <h3>Why This Venue?</h3>
          </div>
          <ul className="recommendation-list">
            <li>Optimal capacity for your expected attendance</li>
            <li>Best connectivity and tech infrastructure</li>
            <li>Historic venue with excellent acoustics</li>
            <li>Convenient accessibility for all attendees</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
