import { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, BarChart3, TrendingUp, Star, ThumbsUp, MessageCircle } from "lucide-react";
import "./feedback.css";

export default function Feedback() {
  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-feedback");
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

  return (
    <motion.div className="feedback-page" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-feedback"></canvas>

      <motion.div className="feedback-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <MessageSquare size={48} />
        </motion.div>
        <h1>Feedback Analysis</h1>
        <p>AI-driven sentiment analysis and insights</p>
      </motion.div>

      <motion.div className="feedback-content" variants={containerVariants}>
        <motion.div className="sentiment-card" variants={itemVariants} custom={1}>
          <div className="sentiment-header">
            <BarChart3 size={24} />
            <h3>Overall Sentiment</h3>
          </div>
          <div className="sentiment-meter">
            <div className="sentiment-positive">
              <StopIcon size={20} />
              <span>92% Positive</span>
            </div>
            <div className="sentiment-gauge">
              <motion.div className="gauge-fill" initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, ease: "easeOut" }}></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className="rating-card" variants={itemVariants} custom={2}>
          <div className="rating-header">
            <Star size={24} />
            <h3>Average Rating</h3>
          </div>
          <div className="rating-display">
            <span className="rating-value">4.7</span>
            <span className="rating-max">/ 5.0</span>
          </div>
          <p className="rating-count">Based on 234 responses</p>
        </motion.div>

        <motion.div className="insights-card" variants={itemVariants} custom={3}>
          <h3>Key Insights</h3>
          <div className="insights-list">
            <div className="insight-item">
              <ThumbsUp size={20} />
              <div>
                <p className="insight-title">Strengths</p>
                <p className="insight-text">Event organization and speaker quality</p>
              </div>
            </div>
            <div className="insight-item">
              <MessageCircle size={20} />
              <div>
                <p className="insight-title">Feedback</p>
                <p className="insight-text">Need more networking opportunities</p>
              </div>
            </div>
            <div className="insight-item">
              <TrendingUp size={20} />
              <div>
                <p className="insight-title">Trends</p>
                <p className="insight-text">Increasing attendee satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="feedback-summary" variants={itemVariants} custom={4}>
          <h3>Actionable Summary</h3>
          <p>Attendees appreciated the event's organization and content quality. Recommendations include extending networking sessions and improving food options.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Simple circle icon for visual consistency
function StopIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
