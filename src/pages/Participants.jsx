import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle2, Mail, Calendar, TrendingUp, UserPlus } from "lucide-react";
import "./participants.css";

export default function Participants() {
  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-participants");
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

  const pastParticipants = [
    { id: 1, name: "Sarah Johnson", events: 3, lastEvent: "2025-12-15" },
    { id: 2, name: "Michael Chen", events: 5, lastEvent: "2025-12-10" },
    { id: 3, name: "Emma Williams", events: 2, lastEvent: "2025-11-20" },
  ];

  return (
    <motion.div className="participants-page" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-participants"></canvas>

      <motion.div className="participants-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Users size={48} />
        </motion.div>
        <h1>Past Participants</h1>
        <p>Track and engage returning attendees</p>
      </motion.div>

      <motion.div className="participants-content" variants={containerVariants}>
        <motion.div className="stats-grid" variants={itemVariants} custom={1}>
          <div className="stat-box">
            <TrendingUp size={28} />
            <h4>156</h4>
            <p>Total Participants</p>
          </div>
          <div className="stat-box">
            <CheckCircle2 size={28} />
            <h4>89</h4>
            <p>Returning Attendees</p>
          </div>
          <div className="stat-box">
            <UserPlus size={28} />
            <h4>67</h4>
            <p>New Registrations</p>
          </div>
        </motion.div>

        <motion.div className="participants-list" variants={itemVariants} custom={2}>
          <div className="list-header">
            <h3>Recent Participants</h3>
            <span className="list-count">Top 3</span>
          </div>
          <div className="participant-items">
            {pastParticipants.map((participant, index) => (
              <motion.div
                key={participant.id}
                className="participant-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <div className="participant-avatar">{participant.name.charAt(0)}</div>
                <div className="participant-info">
                  <h4>{participant.name}</h4>
                  <p>{participant.events} events attended</p>
                </div>
                <div className="participant-date">
                  <Calendar size={16} />
                  <span>{participant.lastEvent}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="re_engage-card" variants={itemVariants} custom={3}>
          <div className="re_engage-header">
            <Mail size={24} />
            <h3>Re-engagement Campaign</h3>
          </div>
          <p>Send invitations to past participants for upcoming events</p>
          <motion.button className="send-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Send Invitations
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
