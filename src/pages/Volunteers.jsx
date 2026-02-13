import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Zap, Shield, Trophy, Handshake } from "lucide-react";
import "./volunteers.css";

export default function Volunteers() {
  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-volunteers");
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

  const skills = [
    { id: 1, name: "Registration", icon: Zap },
    { id: 2, name: "Event Coordination", icon: Handshake },
    { id: 3, name: "Technical Support", icon: Shield },
    { id: 4, name: "Guest Services", icon: Heart },
    { id: 5, name: "Logistics", icon: Trophy },
    { id: 6, name: "Management", icon: Users },
  ];

  return (
    <motion.div className="volunteers-page" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-volunteers"></canvas>

      <motion.div className="volunteers-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Users size={48} />
        </motion.div>
        <h1>Volunteer Management</h1>
        <p>Skill-based volunteer allocation system</p>
      </motion.div>

      <motion.div className="volunteers-content" variants={containerVariants}>
        <motion.div className="volunteer-stats" variants={itemVariants} custom={1}>
          <div className="stat-card">
            <h4>45</h4>
            <p>Active Volunteers</p>
          </div>
          <div className="stat-card">
            <h4>8</h4>
            <p>Skill Categories</p>
          </div>
          <div className="stat-card">
            <h4>12</h4>
            <p>Available Shifts</p>
          </div>
        </motion.div>

        <motion.div className="skills-section" variants={itemVariants} custom={2}>
          <h3>Volunteer Skill Categories</h3>
          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.id}
                  className="skill-badge"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                  <span>{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div className="recruitment-card" variants={itemVariants} custom={3}>
          <h3>Recruitment Status</h3>
          <div className="recruitment-info">
            <p>Positions filled: 34/45 (76%)</p>
            <div className="progress-bar">
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: "76%" }} transition={{ duration: 1.5, ease: "easeOut" }}></motion.div>
            </div>
          </div>
          <motion.button className="recruit-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View Assignments
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
