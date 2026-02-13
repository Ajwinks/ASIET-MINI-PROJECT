import { useState, useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Calendar, Tag, Sparkles, ArrowRight } from "lucide-react";
import "./create-event.css";

export default function CreateEvent() {
  const { setEvent } = useContext(EventContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    date: "",
  });

  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-create");
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

  const handleCreate = async () => {
    if (!form.name || !form.type || !form.date) {
      alert("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setEvent(form);
      navigate("/attendance");
    }, 600);
  };

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
    <motion.div className="create-event" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-create"></canvas>

      <motion.div className="create-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Plus size={48} />
        </motion.div>
        <h1>Create Event</h1>
        <p>Design your intelligent event with AI-powered insights</p>
      </motion.div>

      <motion.div className="create-form" variants={containerVariants}>
        <motion.div className="form-group" variants={itemVariants} custom={1}>
          <label>Event Name</label>
          <div className="input-wrapper">
            <Sparkles size={20} className="input-icon" />
            <input
              type="text"
              placeholder="Enter event name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants} custom={2}>
          <label>Event Type</label>
          <div className="input-wrapper">
            <Tag size={20} className="input-icon" />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">Select event type</option>
              <option value="Conference">Conference</option>
              <option value="Cultural">Cultural</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Meetup">Meetup</option>
              <option value="Networking">Networking</option>
              <option value="Training">Training</option>
              <option value="Seminar">Seminar</option>
            </select>
          </div>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants} custom={3}>
          <label>Event Date</label>
          <div className="input-wrapper">
            <Calendar size={20} className="input-icon" />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.button
          className="create-button"
          onClick={handleCreate}
          variants={itemVariants}
          custom={4}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(14,165,233,0.6)" }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div className="button-loader" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Plus size={20} />
            </motion.div>
          ) : (
            <>
              <span>Create Event</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.div>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
